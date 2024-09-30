import { Injectable } from '@nestjs/common';
import { IFileService } from '@/domain/services/file/file-service.interface';
import {
    MulterFileService,
} from '@/domain/services/file/implementations/multer-file.service';


@Injectable()
export class FileService implements IFileService {
    private readonly _service: IFileService = new MulterFileService(`./static/uploads`);

    async saveTo (
        filePath: string,
        fileName: string,
        fileBuffer: Buffer,
    ): Promise<string> {
        return this._service.saveTo(filePath, fileName, fileBuffer);
    }

    async remove (fullFilePath: string) {
        return this._service.remove(fullFilePath);
    }

    async getFileBuffer (filePath: string): Promise<Buffer> {
        return this._service.getFileBuffer(filePath);
    }
}