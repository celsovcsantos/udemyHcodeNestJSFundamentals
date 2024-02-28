import { Role } from '../enums/role.enum';
import { UserEntity } from '../modules/user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    birthAt: new Date('2000-01-01'),
    email: 'celsovcsantos@gmail.com',
    name: 'Celso Santos',
    password: `$2b$10$0WdYG1Iexl6090qnu7mie.Fw.nxbUSJEWeYex1NqPi0SgNkLDejL6`,
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    birthAt: new Date('2000-01-01'),
    email: 'celsovcsantosteste2@gmail.com',
    name: 'Celso Santos2',
    password: `$2b$10$0WdYG1Iexl6090qnu7mie.Fw.nxbUSJEWeYex1NqPi0SgNkLDejL6`,
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    birthAt: new Date('2000-01-01'),
    email: 'celsovcsantosteste3@gmail.com',
    name: 'Celso Santos3',
    password: `$2b$10$0WdYG1Iexl6090qnu7mie.Fw.nxbUSJEWeYex1NqPi0SgNkLDejL6`,
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
