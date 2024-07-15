import { Injectable } from '@nestjs/common';
import { IFilesService } from '@/domain/services/file/file-service.interface';
import {
    MulterFilesService,
} from '@/domain/services/file/implementations/multer-files.service';


@Injectable()
export class FilesService implements IFilesService {
    private readonly _service: IFilesService = new MulterFilesService(`./static/uploads`);

    async saveTo<T> (
        filePath: string,
        file: T extends Express.Multer.File ? T : never,
    ): Promise<string> {
        return this._service.saveTo(filePath, file);
    }

    async remove (fullFilePath: string) {
        return this._service.remove(fullFilePath);
    }
}