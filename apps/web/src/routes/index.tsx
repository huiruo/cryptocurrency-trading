import {
	Routes,
	Route,
	BrowserRouter
} from "react-router-dom";
import Home from '../pages/home/index';
import NotFound from '../pages/notFound/index'
import CrytoIncreaseCalculator from '../pages/cryto-increase-calculator/index';
import { AddCode } from '@/pages/coin-data/add-code';
import { CoinInfo } from '@/pages/coin-data/coinInfo';
import { CoinList } from '@/pages/coin-data/coinList';
import { Balances } from '@/pages/trade/balances';
import { FutureOrders } from '@/pages/trade/future-orders';
import { SpotOrders } from '@/pages/trade/spot-orders';
import { Strategies } from "@/pages/trade/strategies";
import { AddAsset } from "@/pages/trade/add-asset";
// import Account from '../pages/account/index';
// import Strategy from '../pages/strategy/index'
// import Detail from '../pages/detail/index';
// import StockIncreaseCalculator from '../pages/stock-increase-calculator/index';

const routesConfig = [
	// {
	// 	path: 'detail',
	// 	element: <Detail />,
	// },
	// {
	// 	path: 'account',
	// 	element: <Account />,
	// },
	// {
	// 	path: 'strategy',
	// 	element: <Strategy />,
	// },
	// {
	// 	path: 'stockCalculator',
	// 	element: <StockIncreaseCalculator />,
	// },
	{
		path: 'crytoCalculator',
		element: <CrytoIncreaseCalculator />,
	},

	// == coin start== 
	{
		path: 'coin/addCode',
		element: <AddCode />,
	},
	{
		path: 'coin/list',
		element: <CoinList />,
	},
	{
		path: 'coin/info',
		element: <CoinInfo />,
	},
	// == coin end== 
	// == trade start== 
	{
		path: 'trade/addAsset',
		element: <AddAsset />,
	},
	{
		path: 'trade/strategies',
		element: <Strategies />,
	},
	{
		path: 'trade/balances',
		element: <Balances />,
	},
	{
		path: 'trade/future/order',
		element: <FutureOrders />,
	},
	{
		path: 'trade/spot/order',
		element: <SpotOrders />,
	},
	// == trade end== 
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
