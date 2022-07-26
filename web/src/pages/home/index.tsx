import React,{useEffect} from 'react'
import Header from '../../components/header/index'
// import Footer from '../../components/Footer/index'
import Trader from './trader'
// import traderApi from '../../services/traderApi'

const Index=()=>{

  useEffect(() => {  
    /*
    const onLogin = async()=>{
      const data={
        "account":"abchen",
        "password":"123456"
      }
      const res = await traderApi.onLogin(data)
      if (res.code === 0) {
        console.log("登录成功",res)
      } else {

      } 
    }
    onLogin()
    */
  })
  
  return (
    <div className='root-container'>
			<Header />
      <div className='container'>
        <Trader />
      </div>
    </div>
  );
}

export default Index;