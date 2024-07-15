import { IFilesService } from '@/domain/services/file/file-service.interface';
import * as fs from 'fs';
import * as path from 'path';


export class MulterFilesService implements IFilesService {
    constructor (private readonly _baseDir: string) {
    }

    async saveTo<T> (
        filePath: string,
        file: T extends Express.Multer.File ? T : never,
    ): Promise<string> {
        const randomString     = Array(32).fill(null).map(() => (Math.round(Math.random() * 30)).toString(30)).join('');
        const randomFileName   = `${ randomString }${ path.extname(file.originalname) }`;
        const fullPath: string = path.join(this._baseDir, filePath, randomFileName);
        const dirName: string  = path.dirname(fullPath);

        if (!fs.existsSync(dirName)) {
            await fs.promises.mkdir(dirName, { recursive: true });
        }

        await fs.promises.writeFile(fullPath, file.buffer);
        return fullPath.replace(/\\\\/gi, '/');
    }

    async remove (fullFilePath: string) {
        await fs.promises.unlink(fullFilePath);
        return true;
    }
}