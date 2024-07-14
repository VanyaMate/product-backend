import { Injectable } from '@nestjs/common';
import { IFilesService } from '@/domain/services/files/files-service.interface';
import {
    MainDirFilesService,
} from '@/domain/services/files/implementations/main-dir-files.service';


@Injectable()
export class FilesService implements IFilesService {
    private readonly _service: IFilesService = new MainDirFilesService(`/static`);

    async saveTo (filePath: string, file: File): Promise<string> {
        return this._service.saveTo(filePath, file);
    }
}