import { Role } from '../../enums/role.enum';
import { UpdatePatchUserDto } from '../../modules/user/dto/updatePatchUser.dto';

export const updatePartialUserDTO: UpdatePatchUserDto = {
  role: Role.Admin,
};
