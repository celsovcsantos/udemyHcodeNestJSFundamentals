import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdatePutUserDto } from './dto/updatePutUser.dto';
import { UpdatePatchUserDto } from './dto/updatePatchUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    const userExists = await this.findOne(data.email);
    if (userExists) {
      throw new NotAcceptableException(
        `Usuário (email: ${data.email}) já cadastrado`,
      );
    }

    return await this.prisma.user.create({ data });
  }
  async list(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async findOne(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { email } });
  }
  async show(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async update(
    id: number,
    { email, name, password, birthAt }: UpdatePutUserDto,
  ): Promise<User> {
    await this.exists(id);
    return await this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: { id },
    });
  }
  async updatePartial(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserDto,
  ): Promise<User> {
    await this.exists(id);
    const data: any = {};
    if (birthAt) data.birthAt = new Date(birthAt);
    if (email) data.email = email;
    if (name) data.name = name;
    if (password) data.password = password;
    return await this.prisma.user.update({ data, where: { id } });
  }
  async delete(id: number): Promise<User> {
    await this.exists(id);
    return await this.prisma.user.delete({ where: { id } });
  }
  async exists(id: number) {
    if (!(await this.show(id)))
      throw new NotFoundException(`Usuário (id: ${id}) não encontrado')`);
  }
}
