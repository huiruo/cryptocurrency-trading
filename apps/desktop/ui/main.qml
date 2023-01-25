import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.15
//import MyAppManager 1.0
//import StrategyOrder 1.0

Window {
    width: 640
    height: 480
    visible: true
    title: qsTr("Trading")
    StrategyOrder{
        anchors.centerIn: parent
    }
}
