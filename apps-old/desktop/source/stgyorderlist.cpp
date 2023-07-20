#include "../include/stgyorderlist.h"
#include <QDebug>

StgyOrderList::StgyOrderList(QObject *parent)
    : QObject{parent}
{
   qDebug() << "1.StgyOrderList::StgyOrderList";
   // some mock data
   mItems.append({true, QStringLiteral("foo")});
   mItems.append({false, QStringLiteral("bar")});
}

bool StgyOrderList::setItemAt(int index, const StgyOrderItem &item)
{
   qDebug() << "2.StgyOrderList::setItemAt" << index;
   if (index < 0 || index >= mItems.size())
   {
      qDebug() << "2-1.StgyOrderList::setItemAt=>end";
      return false;
   }

   const StgyOrderItem &oldItem = mItems.at(index);
   if (oldItem.done == item.done && oldItem.description == item.description)
   {
      qDebug() << "2-2.StgyOrderList::setItemAt=>end";
      return false;
   }

   mItems[index] = item;

   qDebug() << "2-3.StgyOrderList::setItemAt=>end";
   return true;
}

QVector<StgyOrderItem> StgyOrderList::items() const
{
   qDebug() << "3.StgyOrderList::items==>";
   return mItems;
}

void StgyOrderList::appendItem()
{
   emit preItemAppended();

   StgyOrderItem item;
   item.done = false;
   qDebug() << "4.StgyOrderList::appendItem=>" << item.description;
   // 添加重要，否则否指针报错
   mItems.append(item);
   emit postItemAppended();
}

void StgyOrderList::removeCompletedItems()
{
   qDebug() << "5.StgyOrderList::removeCompletedItems=>";
   for (int i = 0; i < mItems.size();)
   {
      if (mItems.at(i).done)
      {
         emit preItemRemoved(i);
         mItems.remove(i);
         emit postItemRemoved();
      }
      else
      {
         i++;
      }
   }
}
