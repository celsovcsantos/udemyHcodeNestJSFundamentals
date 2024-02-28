import { Role } from '../enums/role.enum';
import { UpdatePutUserDto } from '../modules/user/dto/updatePutUser.dto';

export const updateUserDTO: UpdatePutUserDto = {
  birthAt: '2000-01-01',
  email: 'celsovcsantos@gmail.com',
  name: 'Celso Santos',
  password: '123456',
  role: Role.User,
};
