import { Controller } from '@nestjs/common';
import { SpotService } from './spot.service';

@Controller('spot')
export class SpotController {

  constructor(
    private readonly SpotService: SpotService,
  ) { }
}
