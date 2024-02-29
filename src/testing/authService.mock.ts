import { AuthService } from '../modules/auth/auth.service';
import { jwtPayload } from './jwtPayload.mock';
import { accessToken } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessToken }),
    checkToken: jest.fn().mockReturnValue(jwtPayload),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockReturnValue({ accessToken }),
    forget: jest.fn().mockReturnValue(true),
    reset: jest.fn().mockReturnValue({ accessToken }),
    register: jest.fn().mockReturnValue({ accessToken }),
  },
};
