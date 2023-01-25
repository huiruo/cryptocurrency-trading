#ifndef MANAGER_H
#define MANAGER_H

#include "./character.h"
#include "./level.h"

#include <QObject>

#include <QNetworkReply>

class Manager : public QObject
{
  Q_OBJECT
  Q_PROPERTY(int total READ getTotal WRITE setTotal NOTIFY totalChanged)
  Q_PROPERTY(QList<Level> levels READ getLevels WRITE setLevels NOTIFY levelsChanged)

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

  Character player() const;

  void setLevels(QList<Level> levels);
  QList<Level> getLevels() const;

signals:
  void totalChanged(int year);
  void levelsChanged(QList<Level> myLevels);

private:
  QString myName;
  int total;
  // new
  Character mPlayer;
  QList<Level> mLevels;
};

#endif
