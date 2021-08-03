import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export enum FILE_TYPE {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FilesService {
  createFile(type: FILE_TYPE, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(
        'Sorry, file was not uploaded. Reload page and try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFile(fileName: string) {}
}
