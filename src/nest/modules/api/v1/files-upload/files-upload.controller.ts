import {
    Controller, Delete, Param, Patch,
    Post, Query, Req, Res,
    UploadedFile, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    FilesUploadService,
} from '@/nest/modules/api/v1/files-upload/files-upload.service';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request } from 'express';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller(`/api/v1/file`)
export class FilesUploadController {
    constructor (private readonly _service: FilesUploadService) {
    }

    @Post()
    @UseGuards(IsUserGuard)
    @UseInterceptors(FileInterceptor('file'))
    loadFile (
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this._service.save(req[REQUEST_USER_ID], file);
    }

    @Delete(`/:fileId`)
    @UseGuards(IsUserGuard)
    removeFile (
        @Req() req: Request,
        @Param('fileId') fileId: string,
    ) {
        return this._service.remove(req[REQUEST_USER_ID], fileId);
    }

    @Patch(`/:fileId`)
    @UseGuards(IsUserGuard)
    updateFile (
        @Req() req: Request,
        @Param('fileId') fileId: string,
        @Query('fileName') fileName: string,
    ) {
        return this._service.update(req[REQUEST_USER_ID], fileId, fileName);
    }
}