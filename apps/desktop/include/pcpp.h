// PCpp.h
#ifndef PCPP_H
#define PCPP_H

#include <QObject>

class PCpp : public QObject
{
  Q_OBJECT
public:
  explicit PCpp(QObject *parent = 0);
  Q_INVOKABLE void showLog();
};

#endif // PCPP_H