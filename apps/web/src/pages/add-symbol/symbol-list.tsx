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

  const onSyncSymbolInfo = (item: SymbolListType) => {
    console.log('onSyncSymbolInfo', item);
  }

  return (
    <div className='symbol-list'>
      {symbolList.map(item => {
        return <div key={item.symbol} className='symbol-item'>
          <span>
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