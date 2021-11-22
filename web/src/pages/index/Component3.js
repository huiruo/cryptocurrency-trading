import React, { version, useState } from 'react';
function App(props) {
  let [test, setTest] = useState('aa')
  const onClick = () => {
    // props.history.push("/detail")
    console.log("version", version)
    console.log("test", test)
    setTest("bb")
  }
  return (
    <div className="container">
      <p>Component1</p>
      <div>
        <button onClick={() => onClick()}>跳转到详情</button>
      </div>
    </div>
  );
}

export default App;