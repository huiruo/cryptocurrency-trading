import React from 'react'
import Routes from './routes/index'
import { HashRouter as Router } from "react-router-dom";

const App =()=>{
  return (
      <Router>
        <Routes />
      </Router>
  );
}

export default App;