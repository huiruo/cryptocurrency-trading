import QtQuick 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.15
import strOrder 1.0

ColumnLayout{Frame{
        ListView {
            implicitWidth: 200
            implicitHeight: 300
            clip: true
            /*
            model: ListModel{
                ListElement{
                    done:true
                    des:"a1"
                }
                ListElement{
                    done:false
                    des:"a2"
                }
            }
            */
            ///*
            model: StrategyOrderModel{}
            //*/
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
            onClicked: toDoList.appendItem()
        }
        Button{
            text: qsTr("Remove item")
            Layout.fillWidth: true
            onClicked: toDoList.removeCompletedItems()
        }
    }
}
