import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrenciesService} from '../currencies/currencies.service';
import { ExchangeInputDto } from './dto/exchange-input.dto';
import { ExchangeType } from './dto/exchange.type';

@Injectable()
export class ExchangeService {

    constructor(private currenciesServices: CurrenciesService) {}

    async convertAmount({from,to,amount}: ExchangeInputDto): Promise<ExchangeType>{

        if (!from || !to || !amount){
            throw new BadRequestException();
        }

        try {           
            const currencyFrom = await this.currenciesServices.getCurrency(from);
            const currencyTo = await this.currenciesServices.getCurrency(to);

            return { amount: (currencyFrom.value /currencyTo.value) * amount}

        } catch (error) {

          throw new Error(error);
            
        }
    }
}
