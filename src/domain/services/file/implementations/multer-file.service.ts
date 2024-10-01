import { IFileService } from '@/domain/services/file/file-service.interface';
import * as fs from 'fs';
import * as path from 'path';


export class MulterFileService implements IFileService {
    constructor (private readonly _baseDir: string) {
    }

    async saveTo (
        filePath: string,
        fileName: string,
        fileBuffer: Buffer,
    ): Promise<string> {
        const randomString     = Array(12).fill(null).map(() => (Math.round(Math.random() * 30)).toString(30)).join('');
        const randomFileName   = `${ path.basename(fileName) }-${ randomString }${ path.extname(fileName) }`;
        const fullPath: string = path.join(this._baseDir, filePath, randomFileName);
        const dirName: string  = path.dirname(fullPath);

        if (!fs.existsSync(dirName)) {
            await fs.promises.mkdir(dirName, { recursive: true });
        }

        await fs.promises.writeFile(fullPath, fileBuffer);
        return fullPath.replace(/\\\\/gi, '/');
    }

    async remove (fullFilePath: string) {
        await fs.promises.unlink(fullFilePath);
        return true;
    }

    async getFileBuffer (fullFilePath: string): Promise<Buffer> {
        return fs.promises.readFile(fullFilePath);
    }
}