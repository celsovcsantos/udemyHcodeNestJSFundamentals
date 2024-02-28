import { Role } from '../enums/role.enum';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';

export const createUserDTO: CreateUserDto = {
  birthAt: '2000-01-01',
  email: 'celsovcsantos@gmail.com',
  name: 'Celso Santos',
  password: '123456',
  role: Role.User,
};
