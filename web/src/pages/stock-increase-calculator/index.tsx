import React,{ useState } from 'react'
import { Box } from '@fower/react'
import { Input } from '../../components/Input/index'


const range:number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]
const StockIncreaseCalculator =()=>{

  const [inputVal, setInputVal] = useState<string>('')
  const [calcultorList,setCalcultorList] = useState<any[]>([])

  // 判断输入是股价，还是股票代码
  const isPrice =(val:string)=>{
      var value = val.toString();
      if (value.indexOf('.') != -1) {
        return true;
      }

      if (value.length == 6) {
        return false;
      }

      return true;
  }

  // const calc_custom_price = ()=>{

  // }

  const onInput = (e:any)=>{
    console.log('input:',e.target.value)
    const val = e.target.value
    setInputVal(e.target.value)

    if(isPrice(val)) {
      const items = [];
      for (var i = 0, len = range.length; i < len; i++) {
        items.push({
          index: range[i],
          down_price: ((100 - range[i]) * val / 100).toFixed(3),
          up_price: ((100 + range[i]) * val / 100).toFixed(3)
        });
      }
      setCalcultorList(items)
    }
  }

  return (
    <Box h='100%' w='100%' bg='grey'>

      <Box w='100%' overflow='auto'>

        <Box w='10.24rem' minH='6.8rem' mt='.4rem' bgBlue100 ml='auto' mr='auto'>
          test

          <Box>
            <Input onChange={(e) => onInput(e)} value={inputVal} placeholder="请输入价格或股票代码"/>
          </Box>
          <Box flex>
            <Box mr='0.8rem'>
              {calcultorList.map((item)=>{
                return(
                  <Box>
                    {item.up_price}
                  </Box>
                )
              })}
            </Box>
            <Box>
              {calcultorList.map((item)=>{
                return(
                  <Box>
                    {item.down_price}
                  </Box>
                )
              })}
            </Box>
          </Box>

        </Box>

      </Box>

    </Box>
  );
}

export default StockIncreaseCalculator;