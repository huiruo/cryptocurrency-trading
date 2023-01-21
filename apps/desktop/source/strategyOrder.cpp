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

QString StrategyOrder::getMyName() const
{
    return myName;
}

void StrategyOrder::setMyName(const QString &newMyName)
{
    myName = newMyName;
}


// setAndGet start
// setAndGet start
// setAndGet start
QString StrategyOrder::getId() const
{
    return id;
}

void StrategyOrder::setId(const QString &newId)
{
    id = newId;
}

QString StrategyOrder::getSymbol() const
{
    return symbol;
}

void StrategyOrder::setSymbol(const QString &newSymbol)
{
    symbol = newSymbol;
}

QString StrategyOrder::getPrice() const
{
    return price;
}

void StrategyOrder::setPrice(const QString &newPrice)
{
    price = newPrice;
}

int StrategyOrder::getOrderType() const
{
    return orderType;
}

void StrategyOrder::setOrderType(int newOrderType)
{
    orderType = newOrderType;
}

int StrategyOrder::getSide() const
{
    return side;
}

void StrategyOrder::setSide(int newSide)
{
    side = newSide;
}

int StrategyOrder::getLeverage() const
{
    return leverage;
}

void StrategyOrder::setLeverage(int newLeverage)
{
    leverage = newLeverage;
}

QString StrategyOrder::getQty() const
{
    return qty;
}

void StrategyOrder::setQty(const QString &newQty)
{
    qty = newQty;
}

QString StrategyOrder::getQuoteQty() const
{
    return quoteQty;
}

void StrategyOrder::setQuoteQty(const QString &newQuoteQty)
{
    quoteQty = newQuoteQty;
}

QString StrategyOrder::getSellingQty() const
{
    return sellingQty;
}

void StrategyOrder::setSellingQty(const QString &newSellingQty)
{
    sellingQty = newSellingQty;
}

QString StrategyOrder::getSellingQuoteQty() const
{
    return sellingQuoteQty;
}

void StrategyOrder::setSellingQuoteQty(const QString &newSellingQuoteQty)
{
    sellingQuoteQty = newSellingQuoteQty;
}

QString StrategyOrder::getEntryPrice() const
{
    return entryPrice;
}

void StrategyOrder::setEntryPrice(const QString &newEntryPrice)
{
    entryPrice = newEntryPrice;
}

QString StrategyOrder::getSellingPrice() const
{
    return sellingPrice;
}

void StrategyOrder::setSellingPrice(const QString &newSellingPrice)
{
    sellingPrice = newSellingPrice;
}

QString StrategyOrder::getSellingTime() const
{
    return sellingTime;
}

void StrategyOrder::setSellingTime(const QString &newSellingTime)
{
    sellingTime = newSellingTime;
}

int StrategyOrder::getProfit() const
{
    return profit;
}

void StrategyOrder::setProfit(int newProfit)
{
    profit = newProfit;
}

QString StrategyOrder::getProfitRate() const
{
    return profitRate;
}

void StrategyOrder::setProfitRate(const QString &newProfitRate)
{
    profitRate = newProfitRate;
}

int StrategyOrder::getRealizedProfit() const
{
    return realizedProfit;
}

void StrategyOrder::setRealizedProfit(int newRealizedProfit)
{
    realizedProfit = newRealizedProfit;
}

QString StrategyOrder::getRealizedProfitRate() const
{
    return realizedProfitRate;
}

void StrategyOrder::setRealizedProfitRate(const QString &newRealizedProfitRate)
{
    realizedProfitRate = newRealizedProfitRate;
}

int StrategyOrder::getFree() const
{
    return free;
}

void StrategyOrder::setFree(int newFree)
{
    free = newFree;
}

int StrategyOrder::getStopType() const
{
    return stopType;
}

void StrategyOrder::setStopType(int newStopType)
{
    stopType = newStopType;
}

QString StrategyOrder::getStopProfit() const
{
    return stopProfit;
}

void StrategyOrder::setStopProfit(const QString &newStopProfit)
{
    stopProfit = newStopProfit;
}

QString StrategyOrder::getStopLoss() const
{
    return stopLoss;
}

void StrategyOrder::setStopLoss(const QString &newStopLoss)
{
    stopLoss = newStopLoss;
}

QString StrategyOrder::getStopProfitPrice() const
{
    return stopProfitPrice;
}

void StrategyOrder::setStopProfitPrice(const QString &newStopProfitPrice)
{
    stopProfitPrice = newStopProfitPrice;
}

QString StrategyOrder::getStopLossPrice() const
{
    return stopLossPrice;
}

void StrategyOrder::setStopLossPrice(const QString &newStopLossPrice)
{
    stopLossPrice = newStopLossPrice;
}

QString StrategyOrder::getNote() const
{
    return note;
}

void StrategyOrder::setNote(const QString &newNote)
{
    note = newNote;
}

QString StrategyOrder::getKlineShots() const
{
    return klineShots;
}

void StrategyOrder::setKlineShots(const QString &newKlineShots)
{
    klineShots = newKlineShots;
}

int StrategyOrder::getIs_running() const
{
    return is_running;
}

void StrategyOrder::setIs_running(int newIs_running)
{
    is_running = newIs_running;
}

QString StrategyOrder::getUserId() const
{
    return userId;
}

void StrategyOrder::setUserId(const QString &newUserId)
{
    userId = newUserId;
}

QString StrategyOrder::getStrategyId() const
{
    return strategyId;
}

void StrategyOrder::setStrategyId(const QString &newStrategyId)
{
    strategyId = newStrategyId;
}

QString StrategyOrder::getTime() const
{
    return time;
}

void StrategyOrder::setTime(const QString &newTime)
{
    time = newTime;
}

QString StrategyOrder::getUpdatedAt() const
{
    return updatedAt;
}

void StrategyOrder::setUpdatedAt(const QString &newUpdatedAt)
{
    updatedAt = newUpdatedAt;
}

QString StrategyOrder::getCreatedAt() const
{
    return createdAt;
}

void StrategyOrder::setCreatedAt(const QString &newCreatedAt)
{
    createdAt = newCreatedAt;
}
// setAndGet end
// setAndGet end
