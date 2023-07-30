#ifndef STGYORDER_H
#define STGYORDER_H
#include "stgyorderlist.h"

#include <QAbstractListModel>

class StgyOrderModel : public QAbstractListModel
{
    Q_OBJECT
    Q_PROPERTY(StgyOrderList *list READ list WRITE setList)

public:
    explicit StgyOrderModel(QObject *parent = nullptr);
    enum
    {
        DoneRole = Qt::UserRole,
        DescriptionRole
    };

    // Basic functionality:
    int rowCount(const QModelIndex &parent = QModelIndex()) const override;

    QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const override;

    // Editable:
    bool setData(const QModelIndex &index, const QVariant &value,
                 int role = Qt::EditRole) override;

    Qt::ItemFlags flags(const QModelIndex &index) const override;

    virtual QHash<int, QByteArray> roleNames() const override;

    StgyOrderList *list() const;
    void setList(StgyOrderList *newList);

private:
    StgyOrderList *mlist;
};

#endif // STGYORDER_H
