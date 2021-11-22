// import './App.css';
// import Component1 from './pages/Component1'
// import Component2 from './pages/Component2'
// import Component3 from './pages/Component3'
import Routes from './routes'
import { HashRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;