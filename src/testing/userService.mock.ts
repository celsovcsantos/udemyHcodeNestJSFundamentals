import { UserService } from '../modules/user/user.service';
import { userEntityList } from './userEntityList.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    list: jest.fn().mockResolvedValue(userEntityList),
    show: jest.fn().mockResolvedValue(userEntityList[0]),
    createHashPassword: jest.fn(),
    update: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePartial: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
