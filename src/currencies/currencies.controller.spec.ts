import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { json } from 'stream/consumers';
import { CurrenciesController } from './currencies.controller';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDTO } from './dto/create-currency.dto';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;
  let service : CurrenciesService;
  let mockData : Currencies;
  let mockDAtaDTO: CreateCurrencyDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers:[{
          provide: CurrenciesService,
          useValue:{
            getCurrency: jest.fn(),
            createCurrency:jest.fn(),
            updateCurrency:jest.fn(),
            deleteCurrency:jest.fn()
          }
      }],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
    service    = module.get<CurrenciesService>(CurrenciesService);

    mockData = {currency:'USD', value : 1} as Currencies;
    mockData


  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrency', () => {
    it('should be throw when service throw', async () => {

      jest.spyOn(service,'getCurrency').mockRejectedValueOnce(new BadRequestException())
      await expect(controller.getCurrency('INVALID')).rejects.toThrow(new BadRequestException());
    });

    it('should be called with corrects params', async () => {
    
      await controller.getCurrency('USD')   
      expect(service.getCurrency).toBeCalledWith('USD');
    });

    it('should be returns when services returns', async () => {
    
      jest.spyOn(service,'getCurrency').mockResolvedValueOnce(mockData);
      expect( await controller.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency', () => {
    it('should be throw when service throw', async () => {

      jest.spyOn(service,'createCurrency').mockRejectedValueOnce(new BadRequestException())
      await expect(controller.createCurrency(mockData)).rejects.toThrow(new BadRequestException());
    })
    
    it('should be called with corrects params', async () => {
    
      await controller.createCurrency(mockData)   
      expect(service.createCurrency).toBeCalledWith(mockData);
    });

    it('should be returns when services returns', async () => {
    
      jest.spyOn(service,'createCurrency').mockResolvedValueOnce(mockData);
      expect( await controller.createCurrency(mockDAtaDTO)).toEqual(mockData);
    });
    
    
  });

});
