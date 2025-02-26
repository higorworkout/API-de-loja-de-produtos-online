import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string | void> {

    try {
      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, file),
        path.resolve(uploadConfig.directory, file),
      );
    } catch(e) {
        return ;
    }

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
      const filePath = path.resolve(uploadConfig.directory, file);

      try {
        await fs.promises.stat(filePath);
      }catch {
        return;
      }

      await fs.promises.unlink(filePath);
  }
}
