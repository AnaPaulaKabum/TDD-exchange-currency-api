import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from './currencies/currencies.entity';

@Module({

  imports: [  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'exchange',
    entities: [Currencies],
    synchronize: true,
  }),ExchangeModule, CurrenciesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
