import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import traderApi from '@/services/traderApi';
import { useDocumentTitle } from "@/utils/useDocumentTitle"
import { Button } from '@/common/button';
import Header from '@/components/header';
import { Box } from '@fower/react';

interface TradeType {
  symbol: string
  price: string
  costPrice: number
  profit: number
  profitRate: string
  quoteQty: string
  time: string
}

/**
 * CODE ANNOTATION
 */
export function WsMarket() {
  const ws = useRef<WebSocket | null>(null);
  const [trade, setTrade] = useState<TradeType>();
  const [message, setMessage] = useState('');
  const [readyState, setReadyState] = useState('正在链接中');
  const [rdNum, SetRdNum] = useState<number>(0);
  const [msg, setMsg] = useState<string>("");

  useDocumentTitle("ws market");

  /**
   * 伪随机函数，测试用
   *  */
  const getRandomInt = useCallback(() => {
    SetRdNum(Math.floor(Math.random() * Math.floor(999)));
  }, []);

  const webSocketInit = useCallback(() => {
    const stateArr = [
      '正在链接中',
      '已经链接并且可以通讯',
      '连接正在关闭',
      '连接已关闭或者没有链接成功',
    ];

    console.log('客户端开始链接...')

    if (!ws.current || ws.current.readyState === 3) {
      ws.current = new WebSocket('ws://localhost:9443');
      ws.current.onopen = _e =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onclose = _e =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onerror = e =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onmessage = e => {
        handleStreams(e.data)
      };
    }
  }, [ws]);

  const handleStreams = (res: any) => {
    console.log('handleStreams:', res)
    const data = JSON.parse(res)

    switch (data.e) {
      case 'account':
        const { symbol, price, costPrice, profit, profitRate, quoteQty, time } = data
        setTrade({ symbol, price, costPrice, profit, profitRate, quoteQty, time })
        break;

      case 'error':
        const { msg } = data
        console.log(msg)
        setMsg(msg)
        break;

      default:
        break;
    }
  }

  /**
   * 初始化 WebSocket
   * 且使用 WebSocket 原声方法获取信息
   *  */
  /*
  useLayoutEffect(() => {
    getRandomInt();
    webSocketInit();
    return () => {
      ws.current?.close();
    };
  }, [ws, getRandomInt, webSocketInit]);
  */

  useEffect(() => {
    return () => {
      console.log('clsoe ws')
      ws.current?.close();
    }
  }, [])

  const onStartWs = async () => {
    // getRandomInt();
    const res = await traderApi.startWsApi()
    console.log('onStartWs:', res)
    webSocketInit()
  }

  const onCloseWs = () => {
    console.log('onCloseWs')
    ws.current?.close();
  }

  const onSendMsg = () => {
    if (ws.current?.readyState !== 1) {
      console.log('尚未链接成功');
      setMessage('正在链接');
      return;
    }
    // ws.current?.send(rdNum.toString());
    ws.current?.send('test');
  }

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <Button onClick={() => onStartWs()} mr4>start</Button>
            <Button onClick={() => onCloseWs()} mr4>close</Button>
            <Button onClick={() => onSendMsg()} mr4>send</Button>
          </Box>
        </Box>

        <Box toCenterX>
          <Box className='table-box-container'>
            {trade?.symbol}价格：{trade?.price};
            成本:{trade?.costPrice}
            盈亏${trade?.profit}-{trade?.profitRate}
            持仓{trade?.quoteQty}
            时间:{trade?.time && new Date(trade?.time).toLocaleString()}
            <div>
              ID:{rdNum}
              msg:{message}
              msg:{msg}
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
}


