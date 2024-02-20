import { Role } from '../enums/role.enum';
import { UpdatePatchUserDto } from '../user/dto/updatePatchUser.dto';

export const updatePartialUserDTO: UpdatePatchUserDto = {
  role: Role.Admin,
};
