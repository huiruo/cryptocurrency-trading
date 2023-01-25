import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.15
import MyAppManager 1.0
import StrategyOrder 1.0
//import Manager

Window {
    width: 640
    height: 480
    visible: true
    title: qsTr("Trading")
    // 作为一个QML对象
    AppManager{
        id: cpp_obj
        // 也可以像原生QML对象一样操作，增加属性之类的
        property int counts: 0
        // myYear:22
        onYearChanged: {
            counts++
            console.log('qml onYearChanged',counts)
        }
        onCountsChanged: {
            console.log('qml onCountsChanged',counts)
        }
    }

    StrategyOrder{
        id: strategyOrder
        Component.onCompleted: {
            console.log('StrategyOrder:','12')
        }}

    Button{
      x:100
      y:100
      text:"Button"
      onClicked: {
        console.log('=========start');
        strategyOrder.sendSignal()
        strategyOrder.changeTotal(strategyOrder.total+1)
        console.log("qml 1:",cpp_obj.name)
        console.log("qml 2:",cpp_obj.year)
        console.log("qml 3:",manager.total)
        console.log("qml 4:",manager.levels)
        // console.log("test1:",cpp_obj.getYear())
        // let testArr1 = [1, 2, 3];
        // console.log("test2:",testArr1)
        console.log('=========end');
      }
    }

    Button{
      text:"get coin"
      onClicked: {
        manager.getCoins()
      }
    }

    Button{
      x:20
      y:20
      text:"get strategy"
      onClicked: {
        manager.getStrategy(null);
      }
    }

    Text {
      x:400
      y:100
      width: 100; height: 25
      text: qsTr("修改 m_nAge：")
      verticalAlignment: Text.AlignVCenter
    }
    Text {
      x:400
      y:300
      width: 100; height: 25
      text: {`${strategyOrder.total}-${manager.total}`}
      verticalAlignment: Text.AlignVCenter
    }

    /*
    MyModel {
        ListElement {
            name: "Bill Smith"
            number: "555 3264"
        }
        ListElement {
            name: "John Brown"
            number: "555 8426"
        }
        ListElement {
            name: "Sam Wise"
            number: "555 0473"
        }
    }
    */

    /*
    ListView {
      width: 380; height: 200
      model: OrderModel {}
      delegate: Text {
          text: name + ": " + number
      }
    }
    */

    ListView {
        // width: 200
        // height: 300
        implicitWidth: 200
        implicitHeight: 300
        clip: true
        // required model
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
        delegate: RowLayout {
        width:parent.width
            TextField{
                text:model.des
                Layout.fillWidth: true
                onEditingFinished: model.des = text
            }
            CheckBox{
                checked: model.done
                onClicked: model.done = checked
            }
        }
    }
}
