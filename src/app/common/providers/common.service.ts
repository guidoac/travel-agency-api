import { Injectable } from '@nestjs/common';
import { ImageFileType } from '../types/files';

@Injectable()
export class CommonService {
  uploadFile(file: ImageFileType): string {
    return file.filename;
  }
}
