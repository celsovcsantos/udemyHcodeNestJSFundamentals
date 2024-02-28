import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';

describe('FileService', () => {
  let fileService: FileService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();
    fileService = module.get<FileService>(FileService);
  });

  it('Validar a definição', () => {
    expect(fileService).toBeDefined();
  });
});
