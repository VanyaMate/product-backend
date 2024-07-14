import { IFilesService } from '@/domain/services/files/files-service.interface';
import fs from 'fs';
import path from 'path';


export class MainDirFilesService implements IFilesService {
    constructor (private readonly _baseDir: string) {
    }

    async saveTo (filePath: string, file: File): Promise<string> {
        const fullPath: string = path.join(this._baseDir, filePath, file.name);
        const dirName: string  = path.dirname(fullPath);

        if (!fs.existsSync(dirName)) {
            await fs.promises.mkdir(dirName, { recursive: true });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.promises.writeFile(fullPath, buffer);

        return fullPath;
    }
}