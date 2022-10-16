import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFileType } from 'src/app/common/types/files';
import { MyFileInterceptor } from '../interceptors/file-upload.interceptor';

@Controller()
export class CommonController {
  @Post('upload')
  @UseInterceptors(MyFileInterceptor())
  uploadFile(@UploadedFile() file: ImageFileType) {
    console.log(file);
  }
}
