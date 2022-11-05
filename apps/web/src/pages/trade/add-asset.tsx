import React, { useState } from 'react';
import Header from '@/components/header';
import { Input } from '@/common/input';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import { toast } from '@/common/toast';
import { useNavigate } from 'react-router-dom';

/**
 * Add asset
 */
export function AddAsset() {
  const [tradeName, setTradeName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [code, setCode] = useState('')

  const navigate = useNavigate();
  useDocumentTitle("Add asset");

  const onAdd = async () => {
    const toaster = toast.loading('Add asset...', { showLayer: true })
    /*
    {
    "name":"BTCUSDT",
    "symbol":"BTC",
    "code":"bitcoin",
    }
    */
    const data = {
      name: tradeName,
      symbol,
      code
    }
    const res = await traderApi.addAssetApi(data)
    if (res.code === 200) {
      setSymbol('')
      setTradeName('')
      setCode('')
      toaster.dismiss()
      navigate('/trade/spot/order', { state: { asset: tradeName } })
    } else {
      toaster.update("Failed to add asset", {
        type: 'error',
      })
    }
  }

  return (
    <div className='root-container'>
      <Header />
      <div className='container symbol-container' style={{ paddingTop: '20px' }} >
        <div className='add-symbol'>
          <div className='custom-input'>
            <Input onChange={(e) => { setTradeName(e.target.value) }} value={tradeName} placeholder="Please enter asset,like XXXUSDT" />
          </div>

          <div className='custom-input'>
            <Input onChange={(e) => { setSymbol(e.target.value) }} value={symbol} placeholder="Please enter symbol" />
          </div>

          <div className='custom-input'>
            <Input onChange={(e) => { setCode(e.target.value) }} value={code} placeholder="Please enter code" />
          </div>

          <div style={{ width: '200px', paddingTop: '20px' }}>
            <Button w-100p onClick={() => onAdd()} size="lg">
              Add
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
