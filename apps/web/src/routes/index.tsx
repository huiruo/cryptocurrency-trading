import React from 'react';
import Home from '../pages/home/index';
import Account from '../pages/account/index';
import NotFound from '../pages/notFound/index'
import Strategy from '../pages/strategy/index'
import Detail from '../pages/detail/index';
import CrytoIncreaseCalculator from '../pages/cryto-increase-calculator/index';
import StockIncreaseCalculator from '../pages/stock-increase-calculator/index';
import {
	HashRouter,
	Routes,
	Route,
	BrowserRouter
} from "react-router-dom";
import AddSymbol from '@/pages/add-symbol';

const routesConfig = [
	{
		path: 'detail',
		element: <Detail />,
	},
	{
		path: 'addSymbol',
		element: <AddSymbol />,
	},
	{
		path: 'account',
		element: <Account />,
	},
	{
		path: 'strategy',
		element: <Strategy />,
	},
	{
		path: 'stockCalculator',
		element: <StockIncreaseCalculator />,
	},
	{
		path: 'crytoCalculator',
		element: <CrytoIncreaseCalculator />,
	}
]

const RoutesContainer = () => {

	const generateRoute = (routes: any) => {
		return routes.map((route: any) => {
			if (route.children !== undefined && route.children.length) {
				return (
					<Route key={route.path} path={route.path}>
						{generateRoute(route.children)}
						<Route index element={route.element} />
					</Route>
				)
			}

			return <Route key={route.path} path={route.path} element={route.element} />
		})
	}

	// console.log('test:', generateRoute(routesConfig));
	return (
		<BrowserRouter>
			{/* <HashRouter> */}
			<Routes>
				<Route path="/">
					{generateRoute(routesConfig)}
				</Route>
				<Route index element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{/* </HashRouter> */}
		</BrowserRouter>
	)
};

export default RoutesContainer;