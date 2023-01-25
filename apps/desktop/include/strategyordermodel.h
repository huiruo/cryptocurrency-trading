#ifndef STRATEGYORDERMODEL_H
#define STRATEGYORDERMODEL_H

#include <QAbstractListModel>

class StrategyOrderModel : public QAbstractListModel
{
    Q_OBJECT
public:
    explicit StrategyOrderModel(QObject *parent = nullptr);
    enum {
      DoneRole = Qt::UserRole,
      DescriptionRole
    };
    // Basic functionality:
    int rowCount(const QModelIndex &parent = QModelIndex()) const override;

    QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const override;

    // Editable:
    bool setData(const QModelIndex &index, const QVariant &value,
                 int role = Qt::EditRole) override;

    Qt::ItemFlags flags(const QModelIndex& index) const override;

    virtual QHash<int,QByteArray> roleNames() const override;

private:
};

#endif // STRATEGYORDERMODEL_H
