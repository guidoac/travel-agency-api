import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageFileType } from 'src/app/common/types/files';
import { TheAuthGuard } from '../guards/auth.guard';
import { TheFileInterceptor } from '../interceptors/file-upload.interceptor';
import { CommonService } from '../providers/common.service';

@UseGuards(TheAuthGuard)
@Controller()
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Post('upload')
  @UseInterceptors(TheFileInterceptor())
  uploadFile(@UploadedFile() file: ImageFileType) {
    return this.commonService.uploadFile(file);
  }
}
