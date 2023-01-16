#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>

#include <QLocale>
#include <QTranslator>

#include "../include/AppManager.h"
#include "../include/pcpp.h"

int main(int argc, char *argv[])
{
#if QT_VERSION < QT_VERSION_CHECK(6, 0, 0)
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
#endif
    QGuiApplication app(argc, argv);

    QTranslator translator;
    const QStringList uiLanguages = QLocale::system().uiLanguages();
    for (const QString &locale : uiLanguages) {
        const QString baseName = "trading_" + QLocale(locale).name();
        if (translator.load(":/i18n/" + baseName)) {
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
    qmlRegisterType<AppManager>("MyAppManager",1,0,"AppManager");

    QQmlApplicationEngine engine;

    //也可以注册为qml全局对象
    // AppManager *appManager = new AppManager();
    // QQmlContext *context = engine.rootContext();
    // engine.rootContext()->setContextkProperty("demo1",new AppManager(appManager));

    const QUrl url(QStringLiteral("qrc:/ui/main.qml"));
    QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
                     &app, [url](QObject *obj, const QUrl &objUrl) {
        if (!obj && url == objUrl)
            QCoreApplication::exit(-1);
    }, Qt::QueuedConnection);
    engine.load(url);

    QQmlContext *context = engine.rootContext();
    PCpp *damo1 = new PCpp();
    context->setContextProperty("Demo1",damo1);

    return app.exec();
}
