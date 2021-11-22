import Routes from './routes/index.tsx'
import { HashRouter as Router } from "react-router-dom";

const App =()=>{
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;