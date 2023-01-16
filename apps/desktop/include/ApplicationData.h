// #ifndef ApplicationData
// #define ApplicationData
#include <QObject>

/*
Q_INVOKABLE 用于声明此方法可被元对象系统调用
*/
class ApplicationData : public QObject
{
  Q_OBJECT
public:
  explicit ApplicationData(QObject *parent = 0);
  // 成员函数想在qml中被调用，则需要在声明前加上Q_INVOKABLE
  Q_INVOKABLE void showLog();
};

// #endif // ApplicationData
