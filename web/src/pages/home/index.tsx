import React,{useEffect} from 'react'
import Header from '../../components/Header/index.tsx'
// import Footer from '../../components/Footer/index.tsx'
import { Box } from '@fower/react'
import Trader from './trader.tsx'
import traderApi from '../../services/traderApi.ts'

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
    <Box column h='100%' w='100%' minH='8.5rem' style={{margin:'0 auto',flex:'1'}}>
			<Header />
      <Trader />
    </Box>
  );
}

export default Index;