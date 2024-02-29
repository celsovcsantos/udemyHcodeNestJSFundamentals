import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { User } from '../../decorators/user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { FileService } from '../file/file.service';
import { AuthService, IToken } from './auth.service';
import { AuthForgetDTO } from './dto/authForget.dto';
import { AuthLoginDTO } from './dto/authLogin.dto';
import { AuthRegisterDTO } from './dto/authRegister.dto';
import { AuthResetDTO } from './dto/authReset.dto';
import { UserEntity } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO): Promise<IToken> {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user: UserEntity) {
    return user;
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 115,
            message: 'Arquivo excedeu o tamanho permitido',
          }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const fileName = `photo-${user.id}.${photo.mimetype.split('/')[1]}`;
    try {
      await this.fileService.upload(photo, fileName);
    } catch (error) {
      throw new BadRequestException(`Error to upload photo: ${error}`);
    }
    return { sucess: true };
  }

  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(
    @User() user: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    //console.log(files.length);
    return files;
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'documents', maxCount: 10 },
    ]),
  )
  @UseGuards(AuthGuard)
  @Post('filesFields')
  async uploadFilesFields(
    @User() user: any,
    @UploadedFiles()
    files: { photo: Express.Multer.File; documents: Express.Multer.File[] },
  ) {
    //console.log(files);
    //const { photo, documents } = files;
    //console.log(photo);
    //console.log(documents);
    return files; //{ photo, documents };
  }
}
