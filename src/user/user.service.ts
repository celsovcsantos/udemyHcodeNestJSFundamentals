import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePutUserDto } from './dto/updatePutUser.dto';
import { UpdatePatchUserDto } from './dto/updatePatchUser.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    data.password = await this.createHashPassword(data.password);

    const userExists = await this.userRepository.exists({
      where: { email: data.email },
    });
    if (userExists) {
      throw new NotAcceptableException(
        `Usuário (email: ${data.email}) já cadastrado`,
      );
    }

    return await this.userRepository.save(this.userRepository.create(data));
  }

  async list(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      order: { id: 'asc' },
    });
  }

  async findOne(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async show(id: number): Promise<UserEntity> {
    await this.exists(id);
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  async createHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async update(
    id: number,
    { email, name, password, birthAt, role }: UpdatePutUserDto,
  ): Promise<UserEntity> {
    await this.exists(id);

    password = await this.createHashPassword(password);

    await this.userRepository.update(
      { id },
      {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : undefined,
        role,
      },
    );

    return await this.show(id);
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt, role }: UpdatePatchUserDto,
  ): Promise<UserEntity> {
    await this.exists(id);
    const data: any = {};
    if (birthAt) data.birthAt = new Date(birthAt);
    if (email) data.email = email;
    if (name) data.name = name;
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    if (role) data.role = role;
    await this.userRepository.update(
      { id },
      {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : undefined,
        role,
      },
    );

    return await this.show(id);
  }

  async delete(id: number): Promise<boolean> {
    await this.exists(id);
    const result = await this.userRepository.delete({ id });
    if (result.affected) return true;
    return false;
  }

  async exists(id: number): Promise<boolean> {
    const ret = await this.userRepository.exists({ where: { id } });
    if (!ret)
      throw new NotFoundException(`Usuário (id: ${id}) não encontrado')`);
    return ret;
  }
}
