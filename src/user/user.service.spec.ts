import { Test, TestingModule } from '@nestjs/testing';
import { createUserDTO } from '../testing/createUserDto.mock';
import { userEntityList } from '../testing/userEntityList.mock';
import { userRepositoryMock } from '../testing/userRepository.mock';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updateUserDTO } from '../testing/updateUserDto.mock';
import { updatePartialUserDTO } from '../testing/updatePartialUserDto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    it('Método create()', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    it('Método list()', async () => {
      const result = await userService.list();
      expect(result).toEqual(userEntityList);
    });
    it('Método show()', async () => {
      const result = await userService.show(userEntityList[0].id);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    it('Método update()', async () => {
      const result = await userService.update(
        userEntityList[0].id,
        updateUserDTO,
      );
      expect(result).toEqual(userEntityList[0]);
    });
    it('Método updatePartial()', async () => {
      const result = await userService.updatePartial(
        userEntityList[0].id,
        updatePartialUserDTO,
      );
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    it('Método delete()', async () => {
      const result = await userService.delete(userEntityList[0].id);
      expect(result).toEqual(true);
    });
  });
});

// import { validaCpf } from '../utils/validations';

// it('it validaCPF', () => {
//   const res = 'OK';
//   expect(validaCpf('099.206.057-51asbcv')).toEqual(res);
// });
