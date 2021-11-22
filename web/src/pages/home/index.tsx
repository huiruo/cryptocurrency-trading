import Header from '../../components/Header/index.tsx'
import Trader from './trader.tsx'
import { Box } from '@fower/react'

const Home = ()=>{
	// const { history } = props
	return (
		<>
			<Header/>
			<Box>
				<Trader/>
			</Box>
		</>
	);
}

export default Home;