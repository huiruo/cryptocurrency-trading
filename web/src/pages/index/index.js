import Component1 from './Component1'
import Component2 from './Component2'
import Component3 from './Component3'
import './index.css';
function App(props) {
	const { history } = props
	return (
		<div className="App">
			<div className="left"><Component1 /></div>
			<div className="container">
				<div className="top"><Component2 /></div>
				<div className="content"><Component3 history={history} /></div>
			</div>
		</div>
	);
}

export default App;