import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';


describe('CurrenciesService', () => {

    let repository;
    let mockData : Currencies

    beforeEach(async () => {    
      const module: TestingModule = await Test.createTestingModule({
        providers: [CurrenciesRepository,
        /*{  provide: CurrenciesService,
          useValue:{
            getCurrency: jest.fn(),
            createCurrency:jest.fn(),
            updateCurrency:jest.fn(),
            deleteCurrency:jest.fn()
          }}*/],
      }).compile();
  
      repository = module.get<CurrenciesRepository>(CurrenciesRepository);
      mockData = {currency:'USD', value : 1} as Currencies;
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
      });

    describe('getCurrency()', () => {
      it('should be called findOne with correct params', async() => {

          jest.spyOn(repository,'findOne').mockReturnValueOnce({});
          await repository.getCurrency('USD');
          expect(repository.findOne).toBeCalledWith({currency: 'USD'});
      });

      it('should be throw findOne returns empty', async() => {

        jest.spyOn(repository,'findOne').mockReturnValueOnce(undefined);
        await expect(repository.getCurrency('USD')).rejects.toThrow(new InternalServerErrorException());
      });

      it('should be returns when find cone return', async() => {


        jest.spyOn(repository,'findOne').mockReturnValueOnce(mockData);
        expect(await repository.getCurrency('USD')).toEqual(mockData);
      });        

    });





});