import React,{useEffect} from 'react'
import Header from '../../components/Header/index'
// import Footer from '../../components/Footer/index'
import { Box } from '@fower/react'
import Trader from './trader'
import traderApi from '../../services/traderApi'

const Index=()=>{

  useEffect(() => {  
    const onLogin = async()=>{
      const data={
        "account":"abchen",
        "password":"123456"
      }
      const res = await traderApi.onLogin(data)
      if (res.status === 200) {

      } else {

      } 
    }
    onLogin()
  })
  
  return (
    <Box h='100%' w='100%' minH='8.5rem'>
			<Header />
      <Box w="15.20rem" minW="15.20rem" style={{margin: '0 auto'}}>
        <Trader />
      </Box>
    </Box>
  );
}

export default Index;