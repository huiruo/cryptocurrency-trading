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
        console.log("test1:",cpp_obj.year)

        // console.log("test1:",cpp_obj.getYear())
        let testArr1 = [1, 2, 3];
        console.log("test2:",testArr1)

        Demo1.showLog()
      }
    }
}
