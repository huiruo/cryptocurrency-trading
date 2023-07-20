import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Result } from 'src/common/result.interface';
import { BinanceService } from 'src/utils/binance-service';
import { WSConnector } from './WSConnector'

@Injectable()
export class MarketCenterService {
  /*
  private clientWs: WebSocket
  private pingTimeout: any
  private baseApiService: BinanceService;

  private positionWsClient: any;
  private positionWsRef: any;
  */

  constructor(
    private configService: ConfigService,
  ) {
    WSConnector.getInstance().connect()
  }

  async startUserWebsocket(): Promise<Result> {

    WSConnector.getInstance().connect()
    return { code: 200, message: 'subscribeWebsocket userData ok', data: null };
  }

  // 户端可能会在不知情的情况下断开连接。
  // 您可能希望在您的客户端上添加一个 ping 侦听器以防止这种情况发生。一个简单的实现是：
  /*
  heartbeat = () => {
    clearTimeout(this.pingTimeout);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      this.terminate();
    }, 30000 + 1000);
  }
  */
}
