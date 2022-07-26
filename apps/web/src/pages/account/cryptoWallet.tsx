import React,{ useEffect,useState } from 'react'
import { Box } from '@fower/react'
import traderApi from "../../services/traderApi"
import { balancesType } from '../../utils/types'
import { formatUnixTime } from '../../utils/index'
import { Button } from '../../components/Button/index'

const CryptoWallet =()=>{

  const [walletList,setWalletList] = useState<balancesType[]>([])


  useEffect(()=>{
    let isUnmount:boolean = false;

    const getCryptoWallet= async()=>{
      const res = await traderApi.cryptoWalletApi()
      if(!isUnmount){
        setWalletList(res.data)
      }
    }
    getCryptoWallet()

    return function cleanup() {
      isUnmount = true
    }
  },[])

  const getCryptoWallet = async()=>{
    const res = await traderApi.cryptoWalletApi()
    setWalletList(res.data)
  }

  const onSync = async()=>{
    const res = await traderApi.updateCryptoWalletApi()
    if(res.code=== 200){
      setTimeout(()=>{
        getCryptoWallet()
      },800)
    }else{
      console.log("同步失败")
    }
  }

  return (
    <Box>
      <Box flex mb='0.1rem' style={{justifyContent: 'space-between'}}>
        <Box>钱包</Box>
        <Box>
          <Button
            onClick={() => { onSync() }}
            size="sm"
          >
            同步钱包
          </Button>
        </Box>
      </Box>
      <Box as='table' w="100%">
        <Box as='thead' bg='aliceblue' style={{border:'1px solid #f0f0f0'}}>
          <tr>
            <Box as='th'>asset</Box>
            <Box as='th'>free</Box>
            <Box as='th'>locked</Box>
            <Box as='th'>updateTime</Box>
          </tr>
        </Box>
        <tbody>
          {walletList.map((item:balancesType) => {
            return (
              <Box as='tr' key={item.id} border-1 borderSolid borderOrange500>
                <Box as='td'>{item.asset}</Box>
                <Box as='td'>{item.free}</Box>
                <Box as='td'>{item.locked}</Box>
                <Box as='td'>{formatUnixTime(Number(item.updateTime))}</Box>
              </Box>
            )
          })}
        </tbody>
      </Box>
    </Box>
  );
}

export default CryptoWallet;