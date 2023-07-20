## 使用
教程1:
https://juejin.cn/post/7184701797506744375

教程2:
https://console.firebase.google.com/project/code-platform-389300/overview?hl=zh-cn
```
npm install firebase
yarn add firebase
```

然后，针对要使用的产品来初始化 Firebase 并开始使用相应 SDK。
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMyEn1jceuy6KTaCI8X3AELksffdKKwhA",
  authDomain: "code-platform-389300.firebaseapp.com",
  projectId: "code-platform-389300",
  storageBucket: "code-platform-389300.appspot.com",
  messagingSenderId: "418533224612",
  appId: "1:418533224612:web:7f08688acad993b0f57631",
  measurementId: "G-H4DRXM2K9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```
