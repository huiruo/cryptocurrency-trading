import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Result } from 'src/common/result.interface';
import { DataCenterService } from './data-center.service';

@Controller('data/center')
export class DataCenterController {
  constructor(
    private readonly DataCenterService: DataCenterService,
    private configService: ConfigService,
  ) { }

  @Post('addCode')
  async createCode(@Body() symbol: any): Promise<Result> {
    const data = await this.DataCenterService.addSymbol(symbol);
    return data;
  }

  @Get('symbolList')
  async symbolList(): Promise<Result> {
    const data = await this.DataCenterService.symbolList();
    return data;
  }

  @Post('syncSymbol')
  async syncSymbolInfo(@Body() symbol: any): Promise<Result> {
    /*
    {"code":"polkadot100","addlink":1,"webp":1}
    {"code":"bitcoin"}
    {"code":"polkadot100"}
    */
    const data = await this.DataCenterService.syncSymbolInfo(symbol);
    return data;
  }
}
