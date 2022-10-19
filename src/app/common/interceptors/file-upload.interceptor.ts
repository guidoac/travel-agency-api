import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export function TheFileInterceptor(path = '') {
  path = `${path}`;

  return FileInterceptor('file', {
    storage: diskStorage({
      destination: `./uploads/${path}`,
      filename: (req, file, cb) => {
        const randomName = uuid();

        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  });
}
