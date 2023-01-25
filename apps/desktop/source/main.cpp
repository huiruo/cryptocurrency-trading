#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>

#include <QLocale>
#include <QQuickView>
#include <QTranslator>

#include "../include/AppManager.h"
#include "../include/Manager.h"

#include "../include/todomodel.h"
#include "../include/todolist.h"

int main(int argc, char *argv[])
{
#if QT_VERSION < QT_VERSION_CHECK(6, 0, 0)
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
#endif
    QGuiApplication app(argc, argv);

    qmlRegisterType<ToDoModel>("ToDo", 1, 0, "ToDoModel");
    qmlRegisterUncreatableType<ToDoList>("ToDo", 1, 0, "ToDoList", QStringLiteral("TodoList cannot be created"));

    ToDoList toDoList;

    QTranslator translator;
    const QStringList uiLanguages = QLocale::system().uiLanguages();
    for (const QString &locale : uiLanguages)
    {
        const QString baseName = "trading_" + QLocale(locale).name();
        if (translator.load(":/i18n/" + baseName))
        {
            app.installTranslator(&translator);
            break;
        }
    }

    /*
    qmlRegisterType注册C++类型至QML
    arg1:import时模块名
    arg2:主版本号
    arg3:次版本号
    arg4:QML类型名
    */
    qmlRegisterType<AppManager>("MyAppManager", 1, 0, "AppManager");

    QQmlApplicationEngine engine;

    engine.rootContext()->setContextProperty(QStringLiteral("toDoList"), &toDoList);

    // 也可以注册为qml全局对象
    //  AppManager *appManager = new AppManager();
    //  QQmlContext *context = engine.rootContext();
    //  engine.rootContext()->setContextkProperty("demo1",new AppManager(appManager));

    const QUrl url(QStringLiteral("qrc:/ui/main.qml"));
    QObject::connect(
        &engine, &QQmlApplicationEngine::objectCreated,
        &app, [url](QObject *obj, const QUrl &objUrl)
        {
        if (!obj && url == objUrl)
            QCoreApplication::exit(-1); },
        Qt::QueuedConnection);
    engine.load(url);

    /*
    QStringList dataList = {
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4"};

    QQuickView view;
    view.setInitialProperties({{"testModel", QVariant::fromValue(dataList)}});
    */

    QQmlContext *context = engine.rootContext();
    Manager *connection = new Manager();
    context->setContextProperty("manager", connection);

    return app.exec();
}
