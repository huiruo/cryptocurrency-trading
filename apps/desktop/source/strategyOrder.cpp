#include "../include/StrategyOrder.h"

#include <QDebug>

StrategyOrder::StrategyOrder(QObject *parent)
    : QObject(parent),
      myName("ruo"),
      total(0)
{
}

void StrategyOrder::sendSignal()
{
  // 测试用，调用该函数后发送信号
  qDebug() << "StrategyOrder::测试用，调用该函数后发送信号";
  emit cppSignalA();
  emit cppSignalB(myName, total);
}

///*
void StrategyOrder::setName(const QString &name)
{
  // qDebug() << "StrategyOrder::setName" << name;
  if (myName != name)
  {
    qDebug() << "emit nameChanged";
    myName = name;
    emit nameChanged(name);
  }
}

QString StrategyOrder::getName() const
{
  qDebug() << "StrategyOrder::getName";
  return myName;
}
//*/

void StrategyOrder::setTotal(int newTotal)
{
  qDebug() << "StrategyOrder::setTotal()" << newTotal;
  if (newTotal != total)
  {
    qDebug() << "emit totalChanged";
    total = newTotal;
    emit totalChanged(total);
  }
}

int StrategyOrder::getTotal() const
{
  qDebug() << "StrategyOrder::getTotal()";
  return total;
}

void StrategyOrder::changeTotal(int total)
{
  qDebug() << "StrategyOrder::changeTotal()";
  StrategyOrder::setTotal(total);
}

void StrategyOrder::cppSlotA()
{
  qDebug() << "StrategyOrder::cppSlotA";
}

void StrategyOrder::cppSlotB(const QString &str, int value)
{
  qDebug() << "StrategyOrder::cppSlotB" << str << value;
}
