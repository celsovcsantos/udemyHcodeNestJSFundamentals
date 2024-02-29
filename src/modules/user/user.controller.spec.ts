import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../../testing/userService.mock';
import { AuthGuard } from '../../guards/auth.guard';
import { guardMock } from '../../testing/guard.mock';
import { RoleGuard } from '../../guards/role.guard';
import { UserService } from './user.service';
import { createUserDTO } from '../../testing/createUserDto.mock';
import { userEntityList } from '../../testing/userEntityList.mock';
import { updateUserDTO } from '../../testing/updateUserDto.mock';
import { updatePartialUserDTO } from '../../testing/updatePartialUserDto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('Validar a definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards neste Controller', () => {
    const guards = Reflect.getMetadata('__guards__', UserController);
    it('Guards estão aplicados', () => {
      expect(guards.length).toEqual(2);
    });
    it('Se o primeiro é o AuthGuard', () => {
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
    });
    it('Se o segundo é o RoleGuard', () => {
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    it('Método create()', async () => {
      const result = await userController.create(createUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    it('Método list()', async () => {
      const result = await userController.list();
      expect(result).toEqual(userEntityList);
    });

    it('Método show()', async () => {
      const result = await userController.show(userEntityList[0].id);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    it('Método update()', async () => {
      const result = await userController.update(
        userEntityList[0].id,
        updateUserDTO,
      );
      expect(result).toEqual(userEntityList[0]);
    });

    it('Método updatePartial()', async () => {
      const result = await userController.updatePartial(
        userEntityList[0].id,
        updatePartialUserDTO,
      );
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    it('Método delete()', async () => {
      const result = await userController.delete(userEntityList[0].id);
      expect(result).toEqual({ sucess: true });
    });
  });
});
