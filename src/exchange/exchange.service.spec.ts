import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies } from 'src/currencies/currencies.entity';
import { CurrenciesInputType } from 'src/currencies/types/currencies-input.type';
import { CurrenciesService} from '../currencies/currencies.service';
import { ExchangeService } from './exchange.service';
import { ExchangeInputType } from './types/exchange-input.type';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesServices: CurrenciesService;
  let mockData : ExchangeInputType; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService,CurrenciesService,
        {
        provide: CurrenciesService,
        useValue:{
          getCurrency: jest.fn().mockReturnValue({value:1}),
        }
      }]

    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesServices = module.get<CurrenciesService>(CurrenciesService);
    mockData = {from:'USD',to:'BRL',amount:1};
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount()', () => {
    it('should be throw if called with invalid params', async () => {

      mockData.from = '';
      await expect(service.convertAmount(mockData)).rejects.toThrow(new BadRequestException());

      mockData.from = 'USD';
      mockData.amount = 0;
      await expect(service.convertAmount(mockData)).rejects.toThrow(new BadRequestException());

      mockData.to = '';
      mockData.amount = 1;
      await expect(service.convertAmount(mockData)).rejects.toThrow(new BadRequestException());
    });

    it('should be not throw if called with valid params', async () => {

      await expect(service.convertAmount(mockData))
      .resolves.not.toThrow();
    }) 

    it('should be called getCurrency twince', async () => {

      await service.convertAmount(mockData);
      expect(currenciesServices.getCurrency).toBeCalledTimes(2);
    });

    it('should be called getCurrency with correct params', async () => {

      await service.convertAmount(mockData);
      expect(currenciesServices.getCurrency).toBeCalledWith('USD');
      expect(currenciesServices.getCurrency).toHaveBeenLastCalledWith('BRL');
    }) 

    it('should be throw when getCurrency throw', async () => {

      mockData.from='INVALID';
      jest.spyOn(currenciesServices, 'getCurrency').mockRejectedValue(new Error);
      await expect(service.convertAmount(mockData)).rejects.toThrow();
    }) 

    it('should be return conversion value', async () => {

      mockData.from = 'USB';
      mockData.to = 'USB';
      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({currency:'USB',value:1} as Currencies);
      expect( await service.convertAmount(mockData)).toEqual({amount:1});

      mockData.from = 'USB';
      mockData.to = 'BRL';
      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({currency:'USB',value:1} as Currencies);
      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({currency:'BRL',value:0.2} as Currencies);
      expect( await service.convertAmount(mockData)).toEqual({amount:5});

      mockData.from = 'BRL';
      mockData.to = 'USB';
      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({currency:'BRL',value:0.2}  as Currencies);
      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({currency:'USB',value:1} as Currencies);
      expect( await service.convertAmount(mockData)).toEqual({amount:0.2});
    }) 





  });


});
