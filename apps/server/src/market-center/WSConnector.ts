import { WebSocketServer } from 'ws';

export class WSConnector {
  private static instance: WSConnector;
  wss: WebSocket;

  private constructor() { }

  public static getInstance(): WSConnector {
    if (!WSConnector.instance) {
      WSConnector.instance = new WSConnector();
    }
    return WSConnector.instance;
  }

  private openEvent = () => {
    console.log('Message: Successfully connected to server');
  };

  public connect() {
    console.log('connecting WSConnector...')
    this.connectToServer();
  }

  private messageEvent = (e: any) => {
    // console.log('wss.onmessage->', e)
    console.log('e.data:', e.data)
  }

  private closeEvent = () => {
    console.log('wss.close->')
  }

  private errorEvent = () => {
    console.log('wss.onerror->')
  }

  private connectToServer() {
    if (this.wss) {
      console.log('wss exists, no need to open')
      return
    }
    const wss = new WebSocketServer({ port: 9443 });
    this.wss = wss
    wss.on('connection', async (ws: any, req: any, client: any) => {
      const ip = req.connection.remoteAddress;
      const port = req.connection.remotePort;
      const clientName = ip + port;
      console.log('%s is connected', { clientName, req: req.connection, client })

      ws.addEventListener('open', this.openEvent);
      ws.addEventListener('message', this.messageEvent);
      ws.addEventListener('close', this.closeEvent);
      ws.addEventListener('error', this.errorEvent);
      /* 
      ws.on('open', this.openEvent);
      ws.on('message', this.messageEvent);
      ws.on('close', this.closeEvent);
      ws.on('error', this.errorEvent);
      */

      const symbol = "BTCUSDT"
      const option = {
        endTime: 1677167999999,
        startTime: 1677081600000,
        symbol
      }

      const isSingle = true
      // await this.handleTrade(option, symbol, isSingle)
    })
  }
}