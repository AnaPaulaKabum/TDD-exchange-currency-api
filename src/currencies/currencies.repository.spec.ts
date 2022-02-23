import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';


describe('CurrenciesService', () => {

    let repository;
    let mockData : Currencies

    beforeEach(async () => {    
      const module: TestingModule = await Test.createTestingModule({
        providers: [CurrenciesRepository],
      }).compile();
  
      repository = module.get<CurrenciesRepository>(CurrenciesRepository);

      mockData = {currency:'USD', value : 1} as Currencies;

      repository.findOne = jest.fn();
      repository.save = jest.fn();
      repository.update = jest.fn();
      repository.delete = jest.fn();
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

    describe('createCurrency()', () => {

        it('should be called save with correct params', async() => {
  
            jest.spyOn(repository,'save').mockReturnValueOnce(mockData);
            await repository.createCurrency(mockData);
            expect(repository.save).toBeCalledWith(mockData);
        });

        it('should be throw when save throw', async() => {
  
          jest.spyOn(repository,'save').mockRejectedValueOnce(new Error());
          await expect(repository.createCurrency(mockData)).rejects.toThrow();
        });

        it('should be throw when findOne throw', async() => {
  
          jest.spyOn(repository,'findOne').mockRejectedValueOnce(new Error());
          await expect(repository.createCurrency(mockData)).rejects.toThrow();
        });

        it('should be findOne undefined returm data', async() => {
  
          jest.spyOn(repository,'findOne').mockReturnValueOnce(undefined);
          expect(await repository.createCurrency(mockData)).toEqual(mockData);
        });

        it('should be findOne data returm throw', async() => {
  
          jest.spyOn(repository,'findOne').mockReturnValueOnce(mockData);
          await expect(repository.createCurrency(mockData)).rejects.toThrow()
        });

        it('should be throw invalid params', async() => {
  
          mockData.currency = 'INVALID';
          await expect(repository.createCurrency(mockData)).rejects.toThrow();
        });

        it('should be returns created data', async() => {
  
          expect(await repository.createCurrency(mockData)).toEqual(mockData);
      });
    });

    describe('updateCurrency()', () => {
      it('should be called findOne with correct params', async() => {

          jest.spyOn(repository,'findOne').mockReturnValueOnce({});
          await repository.updateCurrency(mockData);
          expect(repository.findOne).toBeCalledWith({currency: 'USD'});
      });

      it('should be throw findOne returns empty', async() => {

        jest.spyOn(repository,'findOne').mockReturnValueOnce(undefined);
        await expect(repository.updateCurrency(mockData)).rejects.
        toThrow(new NotFoundException(`The currency ${mockData.currency} not found.`));
      });

      it('should be called update with correct params', async() => {
  
        jest.spyOn(repository,'findOne').mockReturnValueOnce(mockData);
        jest.spyOn(repository,'save').mockReturnValueOnce(mockData);
        await repository.updateCurrency(mockData);
        expect(repository.save).toBeCalledWith(mockData);
      });

    it('should be throw when save throw', async() => {
  
      jest.spyOn(repository,'findOne').mockReturnValueOnce(mockData);
      jest.spyOn(repository,'save').mockRejectedValueOnce(new Error());
      await expect(repository.updateCurrency(mockData)).rejects.toThrow();
    });

    it('should be returns data update data', async() => {
  
      jest.spyOn(repository,'findOne').mockReturnValueOnce({currency:'USD', value : 1});
      jest.spyOn(repository,'save').mockReturnValueOnce({});
      const resultado = await repository.updateCurrency({currency:'USD', value : 2});
      expect(resultado).toEqual({currency:'USD', value : 2});
    });
  });

    describe('deleteCurrency()', () => {
      it('should be findOne with correct params', async() => {

          jest.spyOn(repository,'findOne').mockReturnValueOnce({});
          await repository.deleteCurrency('USD');
          expect(repository.findOne).toBeCalledWith({currency: 'USD'});
      });

      it('should be throw findOne returns empty', async() => {

        jest.spyOn(repository,'findOne').mockReturnValueOnce(undefined);
        await expect(repository.deleteCurrency('USD')).rejects.
        toThrow(new NotFoundException(`The currency ${mockData.currency} not found.`));
      });

      it('should be  called delete with correct params', async() => {

        jest.spyOn(repository,'findOne').mockReturnValueOnce(mockData);
        jest.spyOn(repository,'delete').mockReturnValueOnce({});
        const result = await expect(repository.deleteCurrency('USD'));
        expect(repository.delete).toBeCalledWith({currency: 'USD'});
      });

      it('should be throw when delete throw', async() => {
  
        jest.spyOn(repository,'delete').mockRejectedValueOnce(new Error());
        await expect(repository.deleteCurrency('USD')).rejects.toThrow();
      });
    });
});