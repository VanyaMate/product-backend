import { Injectable } from '@nestjs/common';
import { IFileService } from '@/domain/services/file/file-service.interface';
import {
    MulterFileService,
} from '@/domain/services/file/implementations/multer-file.service';


@Injectable()
export class FileService implements IFileService {
    private readonly _service: IFileService = new MulterFileService(`./static/uploads`);

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