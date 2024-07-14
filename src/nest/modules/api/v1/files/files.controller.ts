import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '@/nest/modules/services/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Request } from 'express';


@Controller(`/api/v1/files`)
export class FilesController {
    constructor (private readonly _service: FilesService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename (req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                callback(null, `${ randomName }${ path.extname(file.originalname) }`);
            },
        }),
    }))
    loadFile (@UploadedFile() file: Express.Multer.File) {
        return file.path;
    }
}