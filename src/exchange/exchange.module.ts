import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';

@Module({
  imports: [CurrenciesModule],
  providers: [ExchangeService],
  controllers: [ExchangeController]
})
export class ExchangeModule {}
