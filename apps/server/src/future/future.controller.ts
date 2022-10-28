import { Controller } from '@nestjs/common';
import { FutureService } from './future.service';
@Controller('future')
export class FutureController {

  constructor(
    private readonly FutureService: FutureService,
  ) { }
}
