#include "strategyordermodel.h"
#include <QDebug>

StrategyOrderModel::StrategyOrderModel(QObject *parent)
    : QAbstractListModel(parent)
{
}

int StrategyOrderModel::rowCount(const QModelIndex &parent) const
{
    // For list models only the root node (an invalid parent) should return the list's size. For all
    // other (valid) parents, rowCount() should return 0 so that it does not become a tree model.
    if (parent.isValid())
        return 0;

    return 20;
}

QVariant StrategyOrderModel::data(const QModelIndex &index, int role) const
{
    if (!index.isValid())
        return QVariant();

    switch(role) {
       case DoneRole:
        return QVariant(false);
       case DescriptionRole:
        return QVariant("test");
    }
    return QVariant();
}

bool StrategyOrderModel::setData(const QModelIndex &index, const QVariant &value, int role)
{
    if (data(index, role) != value) {
        // FIXME: Implement me!
        emit dataChanged(index, index, {role});
        return true;
    }
    return false;
}

Qt::ItemFlags StrategyOrderModel::flags(const QModelIndex &index) const
{
    if (!index.isValid())
        return Qt::NoItemFlags;

    return QAbstractItemModel::flags(index) | Qt::ItemIsEditable; // FIXME: Implement me!
}

QHash<int, QByteArray> StrategyOrderModel::roleNames() const
{
    QHash<int, QByteArray> names;
    names[DoneRole] = "done";
    names[DescriptionRole] = "description";
    qDebug() << "roleNames==>";
    return names;
}
