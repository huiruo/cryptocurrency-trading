#include "../include/AppManager.h"

#include <QDebug>

AppManager::AppManager(QObject *parent)
    : QObject(parent),
      myName("ruo"),
      myYear(0)
{
}

void AppManager::sendSignal()
{
  // 测试用，调用该函数后发送信号
  qDebug() << "AppManager::sendSignal";
  emit cppSignalA();
  emit cppSignalB(myName, myYear);
}

void AppManager::setName(const QString &name)
{
  qDebug() << "AppManager::setName" << name;
  if (myName != name)
  {
    qDebug() << "emit nameChanged";
    myName = name;
    emit nameChanged(name);
  }
}

QString AppManager::getName() const
{
  qDebug() << "AppManager::getName";
  return myName;
}

void AppManager::setYear(int year)
{
  qDebug() << "AppManager::setYear" << year;
  if (year != myYear)
  {
    qDebug() << "emit yearChanged";
    myYear = year;
    emit yearChanged(myYear);
  }
}

int AppManager::getYear() const
{
  qDebug() << "AppManager::getYear";
  return myYear;
}

void AppManager::cppSlotA()
{
  qDebug() << "AppManager::cppSlotA";
}

void AppManager::cppSlotB(const QString &str, int value)
{
  qDebug() << "AppManager::cppSlotB" << str << value;
}
