import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { SymbolListType } from '@/utils/types';
import { Button } from '@/components/Button';

interface SymbolListProps { }

/**
 * 注释
 */
function SymbolList(props: SymbolListProps) {

  const [symbolList, setSymbolList] = useState<SymbolListType[]>([])

  useEffect(() => {
    getSymbolList()
  }, [])

  const getSymbolList = async () => {
    const res = await traderApi.getSymbolList()
    const { data, code } = res
    if (code === 200) {
      console.log('success', res);
      setSymbolList(data)
    } else {
      console.log("同步失败")
    }
  }

  const onSyncSymbolInfo = async (item: SymbolListType) => {
    console.log('onSyncSymbolInfo', item);
    const req = {
      code: item.code
    }
    const res = await traderApi.syncCoinInfoApi(req)
    const { data, code } = res
    if (code === 200) {
      console.log('sync success', res);
    } else {
      console.log("同步失败")
    }
  }

  return (
    <div className='symbol-list'>
      {symbolList.map((item, index) => {
        return <div key={item.symbol} className='symbol-item'>
          <span style={{ marginRight: '10px' }}>{index + 1}.</span>
          <span style={{ marginRight: '10px' }}>
            {item.symbol}
          </span>
          <span>
            {item.code}
          </span>
          <div>
            <Button
              onClick={() => { onSyncSymbolInfo(item) }}
              size="sm"
            >
              同步资源
            </Button>
          </div>
        </div>
      })}
    </div>
  );
}

export default SymbolList;