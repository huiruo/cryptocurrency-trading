import { Controller } from '@nestjs/common';
import { StrategyOrderService } from './strategy-order.service';

@Controller('strategy-order')
export class StrategyOrderController {

  constructor(
    private readonly StrategyOrderService: StrategyOrderService,
  ) { }
}