import React,{ useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { Input } from '../../components/Input/index'
import TableList from '../../components/table-list/index'

const range:number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20
]
const StockIncreaseCalculator =()=>{

  const [inputVal, setInputVal] = useState<string>('100')
  const [calcultorList,setCalcultorList] = useState<any[]>([])

  // 判断输入是股价，还是股票代码
  const isPrice =(val:string)=>{
      var value = val.toString();
      if (value.indexOf('.') !== -1) {
        return true;
      }

      if (value.length === 6) {
        return false;
      }

      return true;
  }

  // const calc_custom_price = ()=>{

  // }

  const onInput = (e:any)=>{
    const val = e.target.value

    console.log('input:',e.target.value)
    setInputVal(e.target.value)
    calculatorUtil(val)
  }

  const calculatorUtil=(val:any)=>{
    if(isPrice(val)) {
      const items = [];
      for (let i = 0, len = range.length; i < len; i++) {
        items.push({
          index: range[i],
          down_price: ((100 - range[i]) * val / 100).toFixed(3),
          up_price: ((100 + range[i]) * val / 100).toFixed(3)
        });
      }

      console.log('list:',items)
      setCalcultorList(items)
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      calculatorUtil(inputVal)
    },1000)
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box minH='100%' w='100%' bg='grey'>
      <Box w='100%' overflow='auto'>
        <Box w='9.24rem' minH='6.8rem' mt='.4rem' bgBlue100 ml='auto' mr='auto'>

          <Box flex w='100%'>
            <Box w='80%' bg='rgb(208 235 255)'>
              <Box w='60%' mb='.1rem' ml='auto' mr='auto'>输入股价或者股票代码，自动计算出各个波动点位对应的价格。</Box>
              <Box w='60%' mb='.1rem' ml='auto' mr='auto'>
                <Box w='3.4rem' >
                {/* <Input onChange={(e) => onInput(e)} value={inputVal} placeholder="请输入价格或股票代码"/> */}
                <Input onChange={(e) => onInput(e)} value={inputVal} placeholder="请输入价格"/>
                </Box>
              </Box>
              <Box w='60%' ml='auto' mr='auto'>
                <TableList
                  rowKey='calcultor_list'
                  dataSource={calcultorList}
                  columns={[
                    {
                      title: '涨幅百分比',
                      key: 'index',
                      render(text) {
                        return text ? `+${text}%` : '--'
                      }
                    },
                    {
                      title: '涨幅对应价格',
                      key: 'up_price',
                      render(text) {
                        return text ? text : '--'
                      }
                    },
                    {
                      title: '跌幅百分比',
                      key: 'index',
                      render(text) {
                        return text ? `-${text}%` : '--'
                      }
                    },
                    {
                      title: '跌幅对应价格',
                      key: 'down_price',
                      render(text) {
                        return text ? text : '--'
                      }
                    }
                  ]}
                  headerStyle={{height:'.38rem'}}
                />
              </Box>
            </Box>
            
            <Box w='20%' bg='#f4f7fc'>
              <span>test</span>
            </Box>

          </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default StockIncreaseCalculator;