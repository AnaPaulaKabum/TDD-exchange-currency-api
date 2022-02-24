import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeType } from './dto/exchange.type';
import { ExchangeController } from './exchange.controller';
import { ExchangeService} from './exchange.service';

describe('ExchangeController', () => {
  let controller: ExchangeController;
  let service: ExchangeService;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [{
        provide: ExchangeService,
        useValue:{
          convertAmount: jest.fn()
          }
      }]
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
    service = module.get<ExchangeService>(ExchangeService);
    mockData= {from:'INVALID',to:'INVALID', amount:1};
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('convertAmount', () => {
    it('should be throw when service throw', async () => {

      jest.spyOn(service,'convertAmount').mockRejectedValueOnce(new BadRequestException())
      await expect(controller.convertAmount(mockData)).rejects.toThrow(new BadRequestException());
    });

    it('should be called with corrects params', async () => {
    
      await controller.convertAmount(mockData)   
      expect(service.convertAmount).toBeCalledWith(mockData);
    });

    it('should be called services with corrects params', async () => {

      const mockReturn = {amount: 1} as ExchangeType;
    
      jest.spyOn(service,'convertAmount').mockResolvedValueOnce(mockReturn);
      expect(await controller.convertAmount(mockData)).toEqual(mockReturn);
    });
  });
});
