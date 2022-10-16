import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageFileType } from 'src/app/common/types/files';
import { MyFileInterceptor } from '../interceptors/file-upload.interceptor';
import { CommonService } from '../providers/common.service';

@Controller()
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Post('upload')
  @UseInterceptors(MyFileInterceptor())
  uploadFile(@UploadedFile() file: ImageFileType) {
    return this.commonService.uploadFile(file);
  }
}
