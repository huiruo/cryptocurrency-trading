#ifndef STGYORDERLIST_H
#define STGYORDERLIST_H

#include <QObject>
#include <QVector>

struct StgyOrderItem
{
    bool done;
    QString description;
};

class StgyOrderList : public QObject
{
    Q_OBJECT
public:
    explicit StgyOrderList(QObject *parent = nullptr);

    bool setItemAt(int index, const StgyOrderItem &item);

    QVector<StgyOrderItem> items() const;

signals:
    void preItemAppended();
    void postItemAppended();

    void preItemRemoved(int index);
    void postItemRemoved();

public slots:
    void appendItem();
    void removeCompletedItems();

private:
    QVector<StgyOrderItem> mItems;
};

#endif // STGYORDERLIST_H
