import Header from '../../components/Header/index.tsx'
import Footer from '../../components/Footer/index.tsx'
import Trader from './trader.tsx'
import { Box } from '@fower/react'

const Home = ()=>{
	// const { history } = props
	return (
		<>
			<Box>
				<Header/>
				<Box flex mt='.15rem'>
					<Trader/>
				</Box>
			</Box>
			<Footer/>
		</>
	);
}

export default Home;