import QtQuick 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.15
import ToDo 1.0

ColumnLayout{Frame{
        ListView {
            implicitWidth: 200
            implicitHeight: 300
            clip: true
            // model: StrategyOrderModel{}
            model: StgyOrderModel{
                list: myStgyorderlist
            }
            delegate: RowLayout {
                width:parent.width
                CheckBox{
                    checked: {model.done || false}
                    onClicked: model.done = checked
                }
                TextField{
                    text:{model.description||''}
                    Layout.fillWidth: true
                    onEditingFinished: model.description = text
                }
            }
        }
    }

    RowLayout{
        Button{
            text: qsTr("Add new item")
            Layout.fillWidth: true
            onClicked: myStgyorderlist.appendItem()
        }
        Button{
            text: qsTr("Remove item")
            Layout.fillWidth: true
            onClicked: myStgyorderlist.removeCompletedItems()
        }
    }
}
