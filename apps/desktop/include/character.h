// Copyright (C) 2016 The Qt Company Ltd.
// SPDX-License-Identifier: LicenseRef-Qt-Commercial OR BSD-3-Clause

#ifndef CHARACTER_H
#define CHARACTER_H

#include <QJsonObject>
#include <QObject>
#include <QString>

//! [0]
class Character
{
  Q_GADGET;

public:
  enum ClassType
  {
    Warrior,
    Mage,
    Archer
  };
  Q_ENUM(ClassType)

  Character();
  Character(const QString &name, int level, ClassType classType);

  QString name() const;
  void setName(const QString &name);

  int level() const;
  void setLevel(int level);

  ClassType classType() const;
  void setClassType(ClassType classType);

  void read(const QJsonObject &json);
  void write(QJsonObject &json) const;

  void print(int indentation = 0) const;

private:
  QString mName;
  int mLevel;
  ClassType mClassType;
};
//! [0]

#endif // CHARACTER_H