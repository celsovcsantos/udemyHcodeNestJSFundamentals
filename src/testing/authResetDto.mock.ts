import { AuthResetDTO } from '../modules/auth/dto/authReset.dto';
import { resetToken } from './resetToken.mock';

export const authResetMockDTO: AuthResetDTO = {
  password: '123456',
  token: resetToken,
};
