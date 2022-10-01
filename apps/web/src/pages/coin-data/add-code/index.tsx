import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import traderApi from '@/services/traderApi';
import SymbolList from './symbol-list';
import { useDocumentTitle } from '@/utils/useDocumentTitle';

/**
 * add symbol form server
 */
export function AddCode() {
  const [code, setCode] = useState('')
  const [symbol, setSymbol] = useState('')

  useDocumentTitle("add code");

  const onAdd = async () => {
    /*
    {
    "symbol":"BTCUSDT",
    "code":"bitcoin",
    "addlink":1,
    "webp":1
    }
    */
    const data = {
      symbol,
      code
    }
    const res = await traderApi.addSimplifySymbol(data)
    if (res.code === 200) {
      console.log('success');
      setSymbol('')
      setCode('')
    } else {
      console.log(res.message)
    }
  }

  return (
    <div className='root-container'>
      <Header />
      <div className='container symbol-container' style={{ paddingTop: '20px' }} >
        <div className='add-symbol'>
          <div className='custom-input'>
            <Input onChange={(e) => { setSymbol(e.target.value) }} value={symbol} placeholder="Please enter symbol" />
          </div>

          <div className='custom-input'>
            <Input onChange={(e) => { setCode(e.target.value) }} value={code} placeholder="Please enter code" />
          </div>

          <div style={{ width: '200px', paddingTop: '20px' }}>
            <Button w-100p onClick={() => { onAdd() }} size="lg">
              add
            </Button>
          </div>
        </div>

        <SymbolList />
      </div>

    </div>
  )
}
