// PCpp.h
#ifndef MANAGER_H
#define MANAGER_H

#include <QObject>

#include <QNetworkReply>

class Manager : public QObject
{
  Q_OBJECT
  Q_PROPERTY(int total READ getTotal WRITE setTotal NOTIFY totalChanged)

public:
  explicit Manager(QObject *parent = 0);
  // void replyFinished(QNetworkReply* reply,int type);
  // void replyFinished(QNetworkReply* reply);
  int replyFinished(QNetworkReply *reply);
  void createRqust(QString url, int type);
  // Q_INVOKABLE void sendGetRequest();
  Q_INVOKABLE void getCoins();
  Q_INVOKABLE int getStrategy(void);

  void setTotal(int total);
  int getTotal() const;

signals:
  // 信号可以qml访问
  void totalChanged(int year);

private:
  QString myName;
  int total;
};

#endif // MANAGER_H
