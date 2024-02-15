import { ParamId } from '@/decorators/paramId.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { Role } from '@/enums/role.enum';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { LogInterceptor } from '@/interceptors/log.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePatchUserDto } from './dto/updatePatchUser.dto';
import { UpdatePutUserDto } from './dto/updatePutUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  //@Roles(Role.User)
  @Get()
  async list() {
    return this.userService.list();
  }

  //@Roles(Role.Admin)
  @Get(':id')
  async show(@ParamId() id: number) {
    //console.log({ id });
    return await this.userService.show(id);
  }

  @Put(':id')
  async update(@ParamId() id: number, @Body() data: UpdatePutUserDto) {
    return await this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@ParamId() id: number, @Body() data: UpdatePatchUserDto) {
    return await this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
