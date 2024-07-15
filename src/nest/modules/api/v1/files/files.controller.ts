import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request } from 'express';
import { FilesService } from '@/nest/modules/api/v1/files/files.service';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';
import {
    FilesSearchOptionsDto,
} from '@/nest/modules/api/v1/files/dto/files-search-options.dto';


@Controller(`/api/v1/files`)
export class FilesController {

    constructor (private readonly _service: FilesService) {
    }

    @Get()
    @UseGuards(IsUserGuard)
    getByUserId (
        @Req() req: Request,
        @Query() searchOptions: FilesSearchOptionsDto,
    ) {
        return this._service.getByUserId(req[REQUEST_USER_ID], searchOptions);
    }

    @Get(`/:fileId`)
    @UseGuards(IsUserGuard)
    getByFileId (
        @Param('fileId') fileId: string,
        @Req() req: Request,
    ) {
        return this._service.getByFileId(req[REQUEST_USER_ID], fileId);
    }
}