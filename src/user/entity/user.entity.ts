import { Role } from '@/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 63 })
  name!: string;

  @Column({ length: 127, unique: true })
  email!: string;

  @Column({ length: 127, unique: true })
  password!: string;

  @Column({ type: 'date', nullable: true })
  birthAt!: Date;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @Column({ enum: [Role.User, Role.Admin], default: Role.User })
  role!: number;
}
