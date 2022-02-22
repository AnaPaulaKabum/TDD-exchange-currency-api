import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { CurrenciesRepository, CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let currenciesRepository: CurrenciesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesService,
      {  provide: CurrenciesRepository,
        useValue:{
          getCurrency: jest.fn(),
        }}],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    currenciesRepository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('convertAmount()', () => {
    it('should be throw if repository throw', async () => {

      jest.spyOn(currenciesRepository,'getCurrency').mockRejectedValueOnce(new InternalServerErrorException());
      await expect(service.getCurrency('INVALID')).rejects.toThrow(new InternalServerErrorException());
    })


    it('should be throw if repository returns ', async () => {

      await expect(service.getCurrency('USB')).resolves.not.toThrow();
    })
  
  
  
  
  
  
  })
});
