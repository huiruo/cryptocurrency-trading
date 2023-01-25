#include "../include/todomodel.h"
#include "../include/todolist.h"

ToDoModel::ToDoModel(QObject *parent)
    : QAbstractListModel(parent),mlist(nullptr)
{
}

int ToDoModel::rowCount(const QModelIndex &parent) const
{
    if (parent.isValid()|| !mlist)
        return 0;

    return mlist->items().size();
}

QVariant ToDoModel::data(const QModelIndex &index, int role) const
{
    qDebug() << "TodoModel::data==>";
    if (!index.isValid() || !mlist)
        return QVariant();

    const ToDoItem item = mlist->items().at(index.row());

    switch(role) {
       case DoneRole:
        return QVariant(item.done);
       case DescriptionRole:
        // return QVariant(QStringLiteral("test data"));
        return QVariant(item.description);
    }
    return QVariant();
}

bool ToDoModel::setData(const QModelIndex &index, const QVariant &value, int role)
{
    if (!mlist)
    {
        return false;
    }

    ToDoItem item = mlist->items().at(index.row());
    switch(role) {
       case DoneRole:
          item.done = value.toBool();
          break;
       case DescriptionRole:
          item.description = value.toString();
          break;
    }

    if (mlist->setItemAt(index.row(), item)){
        emit dataChanged(index, index, QVector<int>() << role);
        return true;
    }

    return false;
}

Qt::ItemFlags ToDoModel::flags(const QModelIndex &index) const
{
    if (!index.isValid())
        return Qt::NoItemFlags;

    return QAbstractItemModel::flags(index) | Qt::ItemIsEditable;
}

QHash<int, QByteArray> ToDoModel::roleNames() const
{
    QHash<int, QByteArray> names;
    names[DoneRole] = "done";
    names[DescriptionRole] = "description";
    qDebug() << "roleNames==>";
    return names;
}

ToDoList *ToDoModel::list() const
{
    return mlist;
}

void ToDoModel::setList(ToDoList *newList)
{
   qDebug() << "TodoModel::setList" << newList->items().size();

   beginResetModel();

  if (mlist) {
      mlist->disconnect(this);
   }

   mlist = newList;

   if (mlist) {
      connect(mlist, &ToDoList::preItemAppended, this, [=](){
         const int index = mlist->items().size();
         beginInsertRows(QModelIndex(), index, index);
      });

      connect(mlist, &ToDoList::postItemAppended, this, [=](){
         endInsertRows();
      });

      connect(mlist, &ToDoList::preItemRemoved, this, [=](int index){
         beginRemoveRows(QModelIndex(), index, index);
      });
      connect(mlist, &ToDoList::postItemRemoved, this, [=](){
         endRemoveRows();
      });
   }

   endResetModel();
}
