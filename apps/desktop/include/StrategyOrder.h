// #ifndef
// #define StrategyOrder
#include <QObject>

/*
Q_INVOKABLE 用于声明此方法可被元对象系统调用
*/
class StrategyOrder : public QObject
{
  Q_OBJECT
  // 注册属性，使之可以在QML中访问--具体语法百度Q_PROPERTY
  // Q_PROPERTY 注册类型为QString 的ss属性，可以在QML中初始化, NOTIFY表示修改之后会触发的信号
  Q_PROPERTY(QString name READ getName WRITE setName NOTIFY nameChanged)
  Q_PROPERTY(int total READ getTotal WRITE setTotal NOTIFY totalChanged)
public:
  explicit StrategyOrder(QObject *parent = 0);
  // 成员函数想在qml中被调用，则需要在声明前加上Q_INVOKABLE
  // 通过Q_INVOKABLE宏标记的public函数可以在QML中访问
  Q_INVOKABLE void sendSignal(); // 功能为发送信号

  // 给类属性添加访问方法--myName
  void setName(const QString &name);
  QString getName() const;

  // 给类属性添加访问方法--total
  void setTotal(int total);
  int getTotal() const;
  Q_INVOKABLE void changeTotal(int total);

  QString getMyName() const;
  void setMyName(const QString &newMyName);
  QString getId() const;
  void setId(const QString &newId);
  QString getSymbol() const;
  void setSymbol(const QString &newSymbol);
  QString getPrice() const;
  void setPrice(const QString &newPrice);
  int getOrderType() const;
  void setOrderType(int newOrderType);
  int getSide() const;
  void setSide(int newSide);
  int getLeverage() const;
  void setLeverage(int newLeverage);
  QString getQty() const;
  void setQty(const QString &newQty);
  QString getQuoteQty() const;
  void setQuoteQty(const QString &newQuoteQty);
  QString getSellingQty() const;
  void setSellingQty(const QString &newSellingQty);
  QString getSellingQuoteQty() const;
  void setSellingQuoteQty(const QString &newSellingQuoteQty);
  QString getEntryPrice() const;
  void setEntryPrice(const QString &newEntryPrice);
  QString getSellingPrice() const;
  void setSellingPrice(const QString &newSellingPrice);
  QString getSellingTime() const;
  void setSellingTime(const QString &newSellingTime);
  int getProfit() const;
  void setProfit(int newProfit);
  QString getProfitRate() const;
  void setProfitRate(const QString &newProfitRate);
  int getRealizedProfit() const;
  void setRealizedProfit(int newRealizedProfit);
  QString getRealizedProfitRate() const;
  void setRealizedProfitRate(const QString &newRealizedProfitRate);
  int getFree() const;
  void setFree(int newFree);
  int getStopType() const;
  void setStopType(int newStopType);
  QString getStopProfit() const;
  void setStopProfit(const QString &newStopProfit);
  QString getStopLoss() const;
  void setStopLoss(const QString &newStopLoss);
  QString getStopProfitPrice() const;
  void setStopProfitPrice(const QString &newStopProfitPrice);
  QString getStopLossPrice() const;
  void setStopLossPrice(const QString &newStopLossPrice);
  QString getNote() const;
  void setNote(const QString &newNote);
  QString getKlineShots() const;
  void setKlineShots(const QString &newKlineShots);
  int getIs_running() const;
  void setIs_running(int newIs_running);
  QString getUserId() const;
  void setUserId(const QString &newUserId);
  QString getStrategyId() const;
  void setStrategyId(const QString &newStrategyId);
  QString getTime() const;
  void setTime(const QString &newTime);
  QString getUpdatedAt() const;
  void setUpdatedAt(const QString &newUpdatedAt);
  QString getCreatedAt() const;
  void setCreatedAt(const QString &newCreatedAt);

signals:
  // 信号可以在QML中访问
  void cppSignalA();                              // 一个无参信号
  void cppSignalB(const QString &str, int value); // 一个带参数信号
  void nameChanged(const QString name);
  void totalChanged(int total);

public slots:
  // public槽函数可以在QML中访问
  void cppSlotA();                              // 一个无参槽函数
  void cppSlotB(const QString &str, int value); // 一个带参数槽函数

private:
  QString myName;
  int total;
  // order
  QString id;
  QString symbol;
  QString price;
  int orderType;
  int side;
  int leverage;
  QString qty;
  QString quoteQty;
  QString sellingQty;
  QString sellingQuoteQty;
  QString entryPrice;
  QString sellingPrice;
  QString sellingTime;
  int profit;
  QString profitRate;
  int realizedProfit;
  QString realizedProfitRate;
  int free;
  int stopType;
  QString stopProfit;
  QString stopLoss;
  QString stopProfitPrice;
  QString stopLossPrice;
  QString note;
  QString klineShots;
  int is_running;
  QString userId;
  QString strategyId;
  QString time;
  QString updatedAt;
  QString createdAt;
};

// #endif
