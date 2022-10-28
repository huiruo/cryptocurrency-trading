import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from 'src/common/result.interface';
import { Page } from 'src/data-center/data-center.controller';
import { FutureService } from './future.service';
@Controller('future')
export class FutureController {

  constructor(
    private readonly FutureService: FutureService,
  ) { }

  @Get('syncFutureOrder')
  async futuresAllOrders(): Promise<Result> {
    return await this.FutureService.futuresAllOrders();
  }

  @Post('futureOrders')
  async getFuturesOrders(@Body() page: Page): Promise<Result> {
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
