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
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePutUserDto } from './dto/updatePutUser.dto';
import { UpdatePatchUserDto } from './dto/updatePatchUser.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() user: CreateUserDto): Promise<any> {
    return { user };
  }

  @Get()
  async findAll() {
    return { users: [] };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, email, password }: UpdatePutUserDto,
  ) {
    return {
      method: 'PUT',
      name,
      email,
      password,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, email, password }: UpdatePatchUserDto,
  ) {
    return {
      method: 'PATCH',
      name,
      email,
      password,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'DELETE',
      id,
    };
  }
}
