import { Controller, Get,Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeType } from './dto/exchange.type';
import { ExchangeInputDto } from './dto/exchange-input.dto';

@Controller('exchange')
export class ExchangeController {

  constructor(private exchangeService: ExchangeService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async convertAmount(@Query() exchangeInputDto: ExchangeInputDto): Promise<ExchangeType> {
    
    return await this.exchangeService.convertAmount(exchangeInputDto);
  }
}
