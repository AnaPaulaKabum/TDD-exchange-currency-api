import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { validateOrReject } from "class-validator";
import { EntityRepository, Repository } from "typeorm";
import { Currencies } from "./currencies.entity";
import { CreateCurrencyDTO } from "./dto/create-currency.dto";

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies>{

    async getCurrency(currency:string):Promise<Currencies>{

        const result = await this.findOne({currency});

        if (!result){
            throw new NotFoundException(`The currency ${currency} not found.`)
        }

        return result;
    }

    async createCurrency(createCurrencyDTO: CreateCurrencyDTO):Promise<Currencies>{

        const result = await this.findOne(createCurrencyDTO.currency);

        if (result){
            throw new InternalServerErrorException(`Currency ${createCurrencyDTO.currency} already created`);
        }

        const createCurrency =  new Currencies();
        createCurrency.currency = createCurrencyDTO.currency;
        createCurrency.value = createCurrencyDTO.value;

        try {
            await validateOrReject(createCurrency);
            await this.save(createCurrency);
            
        } catch (error) {

            throw new InternalServerErrorException(error);     
        }

        return createCurrency;
    }

    async updateCurrency({currency, value}):Promise<Currencies>{
        
        const result = await this.findOne({currency});

        if (!result){
            throw new NotFoundException(`The currency ${currency} not found.`)
        }
        result.value = value;
        await this.save(result);

        return result;
    }

    async deleteCurrency(currency:string):Promise<void>{

        const result = await this.findOne({currency});

        if (!result){
            throw new NotFoundException(`The currency ${currency} not found.`)
        }

        await this.delete({currency});

        return ;
    }
}