import React,{useEffect} from 'react'
import Header from '../../components/Header/index.tsx'
// import Footer from '../../components/Footer/index.tsx'
import { Box } from '@fower/react'
import CenterPanel from './centerPanel.tsx'
import OrderOperation from './orderOperation.tsx'
import UserPanel from './userPanel.tsx'
import platformApi from '../../services/platformApi.ts'
import traderApi from '../../services/traderApi.ts'

const Trader=()=>{

  useEffect(() => {  
    const getData = async()=>{
      const data={
        symbol:'BTC-USDT'
      }

      const res = await platformApi.getSSprice(data)
      console.log("res",res)

      if (res.status === 200) {

      } else {

      } 
    }
    getData()

    const testLogin = async()=>{
      const data={
        "account":"abchen",
        "password":"123456"
      }

      const res = await traderApi.testLogin(data)
      console.log("res_login",res)

      if (res.status === 200) {

      } else {

      } 
    }

    testLogin()

  })
  
  return (
    <Box column h='100%' w='100%' minH='8.5rem' style={{margin:'0 auto',flex:'1'}}>
			<Header/>
      <CenterPanel />
      <Box flex h='3.88rem'>
        <UserPanel />
        <OrderOperation />
      </Box>
    </Box>
  );
}

export default Trader;