QT += quick network

# You can make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
        source/appManager.cpp \
        source/character.cpp \
        source/level.cpp \
        source/main.cpp \
        source/manager.cpp \
        source/todolist.cpp \
        source/todomodel.cpp

RESOURCES += qml.qrc

TRANSLATIONS += \
    res/trading_zh_CN.ts
CONFIG += lrelease
CONFIG += embed_translations

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH =

# Additional import path used to resolve QML modules just for Qt Quick Designer
QML_DESIGNER_IMPORT_PATH =

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

HEADERS += \
    include/AppManager.h \
    include/Manager.h \
    include/character.h \
    include/level.h \
    include/todolist.h \
    include/todomodel.h
