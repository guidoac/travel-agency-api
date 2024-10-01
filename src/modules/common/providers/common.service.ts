import { Injectable } from '@nestjs/common';
import { ImageFileType } from '../types/files';

@Injectable()
export class CommonService {
  uploadFile(file: ImageFileType): string {
    return `${process.env.APP_URL}/${file.path}`;
  }
}
