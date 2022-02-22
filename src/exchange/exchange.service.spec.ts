import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesServices, ExchangeService } from './exchange.service';


describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesServices: CurrenciesServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService,CurrenciesServices,
        {
        provide: CurrenciesServices,
        useValue:{
          getCurrency: jest.fn().mockReturnValue({value:1}),

        }
      }]

    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesServices = module.get<CurrenciesServices>(CurrenciesServices);
  });

  describe('convertAmount()', () => {
    it('should be throw if called with invalid params', async () => {

      await expect(service.convertAmount({from:'',to:'',amount:0}))
      .rejects.toThrow(new BadRequestException());

    });

    it('should be not throw if called with valid params', async () => {

      await expect(service.convertAmount({from:'USD',to:'BRL',amount:1}))
      .resolves.not.toThrow();

    }) 

    it('should be called getCurrency twince', async () => {

      await service.convertAmount({from:'USD',to:'BRL',amount:1});

      expect(currenciesServices.getCurrency).toBeCalledTimes(2);
    });

    it('should be called getCurrency with correct params', async () => {

      await service.convertAmount({from:'USD',to:'BRL',amount:1});
      await expect(currenciesServices.getCurrency).toBeCalledWith('USD');
      await expect(currenciesServices.getCurrency).toHaveBeenLastCalledWith('BRL');
    }) 

    it('should be throw when getCurrency throw', async () => {

      jest.spyOn(currenciesServices, 'getCurrency').mockRejectedValue(new Error);
      await expect(service.convertAmount({from:'INVALID',to:'BRL',amount:1})).rejects.toThrow();

    }) 


    it('should be return conversion value', async () => {

      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({value:1});
      expect( await service.convertAmount({from:'USD',to:'BRL',amount:1})).toEqual({amount:1});

      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({value:1});
      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({value:0.2});
      expect( await service.convertAmount({from:'USD',to:'BRL',amount:1})).toEqual({amount:5});

      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({value:0.2});
      jest.spyOn(currenciesServices, 'getCurrency').mockResolvedValueOnce({value:1});
      expect( await service.convertAmount({from:'USD',to:'BRL',amount:1})).toEqual({amount:0.2});
    }) 





  });


});
