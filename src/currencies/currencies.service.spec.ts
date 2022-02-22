import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies, CurrenciesRepository, CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let currenciesRepository: CurrenciesRepository;
  let mockData : Currencies;

  beforeEach(async () => {

    
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesService,
      {  provide: CurrenciesRepository,
        useValue:{
          getCurrency: jest.fn(),
          createCurrency:jest.fn(),
          updateCurrency:jest.fn(),
          deleteCurrency:jest.fn()
        }}],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    currenciesRepository = module.get<CurrenciesRepository>(CurrenciesRepository);
    mockData = {currency:'USD',value:1};
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getCurrency()', () => {
    it('should be throw if repository throw', async () => {

      jest.spyOn(currenciesRepository,'getCurrency').mockRejectedValueOnce(new InternalServerErrorException());
      await expect(service.getCurrency('INVALID')).rejects.toThrow(new InternalServerErrorException());
    });


    it('should be throw if repository returns ', async () => {

      await expect(service.getCurrency('USB')).resolves.not.toThrow();
    })

    it('should called repository correct params ', async () => {

      await service.getCurrency('USB');
      expect(currenciesRepository.getCurrency).toBeCalledWith('USB');
     })

     it('should be return when repository return', async () => {
      jest.spyOn(currenciesRepository,'getCurrency').mockResolvedValueOnce(mockData);    
      expect(await service.getCurrency('USB')).toEqual(mockData);
     });

    });
    
     describe('createCurrency()', () => {
      it('should be throw if repository throw', async () => {
  
        mockData.currency='INVALID';
        jest.spyOn(currenciesRepository,'createCurrency').mockRejectedValueOnce(new InternalServerErrorException());
        await expect(service.createCurrency(mockData)).rejects.toThrow(new InternalServerErrorException());
      });

      it('should be throw if repository returns ', async () => {

        await expect(service.createCurrency(mockData)).resolves.not.toThrow();
      });

      it('should called repository correct params ', async () => {

        await service.createCurrency(mockData);
        expect(currenciesRepository.createCurrency).toBeCalledWith(mockData);
       });

      it('should be throw if value <=0 ', async () => {
        mockData.value = 0;
        await expect(service.createCurrency(mockData)).rejects.toThrow(new BadRequestException("The value must be greater zero"));
       })

       it('should be return when repository return', async () => {
        jest.spyOn(currenciesRepository,'createCurrency').mockResolvedValueOnce(mockData);    
        expect(await service.createCurrency(mockData)).toEqual(mockData);
       });
    });
  
    describe('updateCurrency()', () => {
      it('should be throw if repository throw', async () => {
  
        mockData.currency='INVALID';
        jest.spyOn(currenciesRepository,'updateCurrency').mockRejectedValueOnce(new InternalServerErrorException());
        await expect(service.updateCurrency(mockData)).rejects.toThrow(new InternalServerErrorException());
      });

      it('should be throw if repository returns ', async () => {

        await expect(service.updateCurrency(mockData)).resolves.not.toThrow();
      });
  
      it('should called repository correct params ', async () => {

        await service.updateCurrency(mockData);
        expect(currenciesRepository.updateCurrency).toBeCalledWith(mockData);
       });

       it('should be throw if value <=0 ', async () => {
        mockData.value = 0;
        await expect(service.updateCurrency(mockData)).rejects.toThrow(new BadRequestException("The value must be greater zero"));
       })

       it('should be return when repository return', async () => {
        jest.spyOn(currenciesRepository,'updateCurrency').mockResolvedValueOnce(mockData);    
        expect(await service.updateCurrency(mockData)).toEqual(mockData);
       });
    });

    describe('deleteCurrency()', () => {
      it('should be throw if repository throw', async () => {
  
        jest.spyOn(currenciesRepository,'deleteCurrency').mockRejectedValueOnce(new InternalServerErrorException());
        await expect(service.deleteCurrency('INVALID')).rejects.toThrow(new InternalServerErrorException());
      });

      it('should be throw if repository returns ', async () => {

        await expect(service.deleteCurrency(mockData.currency)).resolves.not.toThrow();
      });

      it('should called repository correct params ', async () => {

        await service.deleteCurrency(mockData.currency);
        expect(currenciesRepository.deleteCurrency).toBeCalledWith(mockData.currency);
       });
    });
  
  
  

});
