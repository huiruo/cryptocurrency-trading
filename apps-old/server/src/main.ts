import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BinanceService } from './utils/binance-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const apiKey = configService.get<string>('binanceApiKey');
  const secretKey = configService.get<string>('binanceSecretKey');
  if (apiKey && secretKey) {
    console.log('bootstrap init base', { apiKey, secretKey });
    BinanceService.getInstance().connect(apiKey, secretKey)
  } else {
    console.log('=== Api key do not exist ===');
  }

  await app.listen(1788);
}

bootstrap();