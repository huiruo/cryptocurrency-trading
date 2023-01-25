#include "../include/todolist.h"
#include <QDebug>

ToDoList::ToDoList(QObject *parent)
    : QObject{parent}
{
   qDebug() << "1.ToDoList::ToDoList";
   // some mock data
   mItems.append({true, QStringLiteral("foo")});
   mItems.append({false, QStringLiteral("bar")});
}

bool ToDoList::setItemAt(int index, const ToDoItem &item)
{
   qDebug() << "2.ToDoList::setItemAt"<<index;
   if (index < 0 || index >= mItems.size()) {
      qDebug() << "2-1.ToDoList::setItemAt=>end";
      return false;
   }

   const ToDoItem &oldItem = mItems.at(index);
   if (oldItem.done == item.done && oldItem.description == item.description) {
      qDebug() << "2-2.ToDoList::setItemAt=>end";
      return false;
   }

   mItems[index] = item;

   qDebug() << "2-3.ToDoList::setItemAt=>end";
   return true;
}


QVector<ToDoItem> ToDoList::items() const
{
   qDebug() << "3.ToDoList::items==>";
   return mItems;
}

void ToDoList::appendItem()
{
   emit preItemAppended();

   ToDoItem item;
   item.done = false;
   qDebug() << "4.ToDoList::appendItem=>"<< item.description;
   // 添加重要，否则否指针报错
   mItems.append(item);
   emit postItemAppended();
}

void ToDoList::removeCompletedItems()
{
   qDebug() << "5.ToDoList::removeCompletedItems=>";
   for (int i = 0; i < mItems.size(); ) {
      if (mItems.at(i).done) {
         emit preItemRemoved(i);
         mItems.remove(i);
         emit postItemRemoved();
      } else {
         i++;
      }
   }
}
