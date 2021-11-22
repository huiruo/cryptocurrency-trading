import { Box } from '@fower/react'
import {Button} from '../../components/Button/index.tsx'

const Trader=()=>{
  const onBuy=()=>{
    console.log("onBuy")
  }

  const onSell=()=>{
    console.log("onSell")
  }

  return (
    <Box minH='8.5rem'>
      <Box flex>
        <Box>
          <Button
            w-100p
            onClick={() => { onBuy() }}
            size="lg"
          >
          新建购买订单
          </Button>
        </Box>

        <Box>
          <Button
            w-100p
            onClick={() => { onSell() }}
            size="lg"
          >
            新建卖出订单
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Trader;