import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../guards/auth.guard';
import { authForgetMockDTO } from '../../testing/authForgetDto.mock';
import { authLoginMockDTO } from '../../testing/authLoginDto.mock';
import { authRegisterDTO } from '../../testing/authRegisterDto.mock';
import { authResetMockDTO } from '../../testing/authResetDto.mock';
import { authServiceMock } from '../../testing/authService.mock';
import { fileServiceMock } from '../../testing/fileService.mock';
import { guardMock } from '../../testing/guard.mock';
import { accessToken } from '../../testing/token.mock';
import { AuthController } from './auth.controller';
import { userEntityList } from '../../testing/userEntityList.mock';
import { getPhotoMock } from '../../testing/getPhoto.mock';

describe('AuthController', () => {
  let authController: AuthController;
  //   let authService: AuthService;
  //   let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Validar a definição', () => {
    expect(authController).toBeDefined();
  });

  //   describe('Teste da aplicação dos Guards neste Controller', () => {
  //     const guards = Reflect.getMetadata('__guards__', authController);
  //     it('Guards estão aplicados', () => {
  //       expect(guards.length).toEqual(1);
  //     });
  // it('Se o primeiro é o AuthGuard', () => {
  //   expect(new guards[0]()).toBeInstanceOf(AuthGuard);
  // });
  // it('Se o segundo é o RoleGuard', () => {
  //   expect(new guards[1]()).toBeInstanceOf(RoleGuard);
  // });
  //   });

  describe('Autenticação', () => {
    it('Método login()', async () => {
      const result = await authController.login(authLoginMockDTO);
      expect(result).toEqual({ accessToken });
    });

    it('Método register()', async () => {
      const result = await authController.register(authRegisterDTO);
      expect(result).toEqual({ accessToken });
    });

    it('Método forget()', async () => {
      const result = await authController.forget(authForgetMockDTO);
      expect(result).toEqual(true);
    });

    it('Método reset()', async () => {
      const result = await authController.reset(authResetMockDTO);
      expect(result).toEqual({ accessToken });
    });
  });
  describe('Rotas autenticadas', () => {
    it('Método me()', async () => {
      const result = await authController.me(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });
    it('Método uploadPhoto()', async () => {
      const photo = await getPhotoMock();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual({ sucess: true });
    });
  });
});
