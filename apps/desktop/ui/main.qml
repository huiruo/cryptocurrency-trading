import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Controls 2.5
import MyAppManager 1.0

Window {
    width: 640
    height: 480
    visible: true
    title: qsTr("Trading")
    // 作为一个QML对象
    AppManager{
        id:cpp_obj
        // 也可以像原生QML对象一样操作，增加属性之类的
        property int counts: 0
        onYearChanged: {
            counts++
            console.log('qml onYearChanged',counts)
        }
        onCountsChanged: {
            console.log('qml onCountsChanged',counts)
        }
    }

    Button{
      x:100
      y:100
      text:"Button"
      onClicked: {
        console.log("test1:",cpp_obj.name)
        console.log("test2:",cpp_obj.year)
        console.log("test5:",manager.total)
        // console.log("test1:",cpp_obj.getYear())
        let testArr1 = [1, 2, 3];
        // console.log("test2:",testArr1)
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
      y:200
      width: 100; height: 25
      text: { manager.total }
      verticalAlignment: Text.AlignVCenter
    }
}
