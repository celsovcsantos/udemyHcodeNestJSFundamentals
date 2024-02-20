import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/user/entity/user.entity';
import { userEntityList } from './userEntityList.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    exists: jest.fn().mockResolvedValue(userEntityList[0]),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(userEntityList[0]),
    find: jest.fn().mockResolvedValue(userEntityList),
    findOne: jest.fn().mockResolvedValue(userEntityList[0]),
    findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
