import { Role } from '@/enums/role.enum';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  })
  password!: string;

  @IsOptional()
  @IsDateString()
  birthAt!: string;

  @IsOptional()
  @IsEnum(Role)
  role!: number;
}
