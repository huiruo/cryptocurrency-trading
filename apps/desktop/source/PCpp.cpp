#include "../include/pcpp.h"
#include <QDebug>
PCpp::PCpp(QObject *parent) : QObject(parent)
{
}

void PCpp::showLog()
{
  qDebug() << "pcpp.h PCpp test";
}
