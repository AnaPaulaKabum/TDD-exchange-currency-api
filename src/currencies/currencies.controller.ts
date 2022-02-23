import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDTO } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrenciesController {

    constructor(private currienciesService:CurrenciesService){}

    @Get('/:currency')
    async getCurrency(@Param('currency') currency:string): Promise<Currencies>{
        return await this.currienciesService.getCurrency(currency);
        
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createCurrency(@Body() createCurrencyDTO: CreateCurrencyDTO): Promise<Currencies>{ 
        
        return await this.currienciesService.createCurrency(createCurrencyDTO);
    } 

    @Delete()
    @Get('/:currency')
    async deleteCurrency(@Param('currency') currency:string): Promise<void>{
        return await this.currienciesService.deleteCurrency(currency);
    }

    @Patch('/:currency/value')
    @UsePipes(ValidationPipe)
    async updateCurrency(@Param('currency') currency:string, @Body('value') value:number): Promise<Currencies>{ 

        return  await this.currienciesService.updateCurrency({currency,value});
    } 

}
