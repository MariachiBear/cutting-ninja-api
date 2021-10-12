import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from 'src/models/url/url.controller';

describe('UrlController', () => {
   let controller: UrlController;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [UrlController],
      }).compile();

      controller = module.get<UrlController>(UrlController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
