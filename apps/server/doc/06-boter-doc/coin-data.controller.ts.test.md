import { Controller, Get, Post, Body } from '@tiejs/controller'
import { CoinDataService } from './coin-data.service'

export interface Result {
  code: number;
  message: string;
  data?: any;
}

@Controller('/api/coin')
export class CoinDataController {
  constructor(private CoinDataService: CoinDataService) { }

  /*
  {    
    "symbol":"BTCUSDT",
    "code":"bitcoin"
  }
  */

  /*
  @Post('/addCode')
  async addCode(@Body() body: any): Promise<Result> {
    const res = await this.CoinDataService.addCode(body)

    return res
  }
  */

  /*
  @Get('/list')
  async getCodelist(): Promise<Result> {
    const res = await this.CoinDataService.getCoinCodelist();
    return res;
  }
  */

  /*
  @Get('/symbol/list')
  async getSymbollist(): Promise<Result> {
    console.log('symbol/list');
    const res = await this.CoinDataService.getSymbollist();
    return res;
  }
  */
  /*
  @Post('/syncSymbol')
  // async syncSymbolInfo(@Body() symbol: any): Promise<Result> {
  // async syncSymbolInfo(@Body() symbol: any) {

    {"code":"polkadot100","addlink":1,"webp":1}
    {"code":"bitcoin"}
    {"code":"polkadot100"}

    const data = await this.CoinDataService.syncSymbolInfo(symbol);
    return data;
  }
 */
}
