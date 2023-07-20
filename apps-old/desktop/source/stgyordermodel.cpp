#include "../include/stgyordermodel.h"
#include "../include/stgyorderlist.h"

StgyOrderModel::StgyOrderModel(QObject *parent)
    : QAbstractListModel(parent), mlist(nullptr)
{
}

int StgyOrderModel::rowCount(const QModelIndex &parent) const
{
    if (parent.isValid() || !mlist)
        return 0;

    return mlist->items().size();
}

QVariant StgyOrderModel::data(const QModelIndex &index, int role) const
{
    qDebug() << "StgyOrderModel::data==>";
    if (!index.isValid() || !mlist)
        return QVariant();

    const StgyOrderItem item = mlist->items().at(index.row());

    switch (role)
    {
    case DoneRole:
        return QVariant(item.done);
    case DescriptionRole:
        // return QVariant(QStringLiteral("test data"));
        return QVariant(item.description);
    }
    return QVariant();
}

bool StgyOrderModel::setData(const QModelIndex &index, const QVariant &value, int role)
{
    if (!mlist)
    {
        return false;
    }

    StgyOrderItem item = mlist->items().at(index.row());
    switch (role)
    {
    case DoneRole:
        item.done = value.toBool();
        break;
    case DescriptionRole:
        item.description = value.toString();
        break;
    }

    if (mlist->setItemAt(index.row(), item))
    {
        emit dataChanged(index, index, QVector<int>() << role);
        return true;
    }

    return false;
}

Qt::ItemFlags StgyOrderModel::flags(const QModelIndex &index) const
{
    if (!index.isValid())
        return Qt::NoItemFlags;

    return QAbstractItemModel::flags(index) | Qt::ItemIsEditable;
}

QHash<int, QByteArray> StgyOrderModel::roleNames() const
{
    QHash<int, QByteArray> names;
    names[DoneRole] = "done";
    names[DescriptionRole] = "description";
    qDebug() << "roleNames==>";
    return names;
}

StgyOrderList *StgyOrderModel::list() const
{
    return mlist;
}

void StgyOrderModel::setList(StgyOrderList *newList)
{
    qDebug() << "StgyOrderModel::setList" << newList->items().size();

    beginResetModel();

    if (mlist)
    {
        mlist->disconnect(this);
    }

    mlist = newList;

    if (mlist)
    {
        connect(mlist, &StgyOrderList::preItemAppended, this, [=]()
                {
         const int index = mlist->items().size();
         beginInsertRows(QModelIndex(), index, index); });

        connect(mlist, &StgyOrderList::postItemAppended, this, [=]()
                { endInsertRows(); });

        connect(mlist, &StgyOrderList::preItemRemoved, this, [=](int index)
                { beginRemoveRows(QModelIndex(), index, index); });
        connect(mlist, &StgyOrderList::postItemRemoved, this, [=]()
                { endRemoveRows(); });
    }

    endResetModel();
}
