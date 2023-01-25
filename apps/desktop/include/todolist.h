#ifndef TODOLIST_H
#define TODOLIST_H

#include <QObject>
#include <QVector>

struct ToDoItem {
   bool done;
   QString description;
};

class ToDoList : public QObject
{
    Q_OBJECT
public:
    explicit ToDoList(QObject *parent = nullptr);

    bool setItemAt(int index,const ToDoItem &item);

    QVector<ToDoItem> items() const;

signals:
   void preItemAppended();
   void postItemAppended();

   void preItemRemoved(int index);
   void postItemRemoved();

public slots:
   void appendItem();
   void removeCompletedItems();

private:
    QVector<ToDoItem> mItems;
};

#endif // TODOLIST_H
