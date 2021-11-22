import Home from '../pages/home/index.tsx';
import Detail from '../pages/detail/index.tsx';
import NotFound from '../pages/notFound/index.tsx'
import {
	Switch,
	Route,
	withRouter,
	HashRouter,
	Redirect
} from 'react-router-dom';

//1.动态路由
const Routes = withRouter(({ location, history }) => {

		const routesConfig = [
			{
				path: '/',
				component: Home,
				exact: true,
			},
			{
				path: '/detail',
				component: Detail,
			},
		]
		/*
		静态路由：
		const Routes = withRouter(({ location, history }) => {
			return (
				<HashRouter>
					<Switch>
						<Route exact path="/" component={Index}></Route>
						<Route path="/detail" component={Detail}></Route>
					</Switch>
				</HashRouter>
			)
		});
		*/
		//2.根据条件生成相应的组件
		const RouteWithSubRoutes = (route) => {
			console.log("2.根据条件生成相应的组件", route)
			// if (!route.path) return <Route component={NotFound} />
			return (
				<Route
				exact strict
				path={route.path}
				render={props => (
					route.redirect ?
						<Redirect push to={route.redirect} from={route.path}></Redirect> :
						<route.component {...props} routes={route.routes} />
				)}
			/>)
		}

	console.log("1.动态生成路由", location, history)
	return (
		<HashRouter>
			<Switch>
				{routesConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
				<Route component={NotFound} />
			</Switch>
		</HashRouter>
	)
});

export default Routes;