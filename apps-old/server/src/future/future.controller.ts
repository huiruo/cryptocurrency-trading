import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from 'src/common/result.interface';
import { FutureService } from './future.service';
import { PaginationType } from 'src/common/types';

@Controller('future')
export class FutureController {

  constructor(
    private readonly FutureService: FutureService,
  ) { }

  @Get('syncFutureOrder')
  async futuresAllOrders(): Promise<Result> {
    return await this.FutureService.futuresAllOrders();
    // return await this.FutureService.futuresOpenOrders();
  }

  @Get('cancelAllOpenOrders')
  async cancelAllOpenOrders(@Body() option: { symbol: string }): Promise<Result> {
    return await this.FutureService.futuresCancelAllOpenOrders({ symbol: option.symbol });
  }

  @Post('futureOrders')
  async getFuturesOrders(@Body() page: PaginationType): Promise<Result> {
    return await this.FutureService.getFutureOrders(
      page.currentPage,
      page.pageSize,
    );
  }

  @Get('futuresBatchOrders')
  async futuresBatchOrders(): Promise<Result> {
    return await this.FutureService.futuresBatchOrders();
  }
  // =========== future end ===========
}
