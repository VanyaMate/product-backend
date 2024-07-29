import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
    LanguagesService,
} from '@/nest/modules/api/v1/languages/languages.service';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request } from 'express';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller(`api/v1/languages`)
export class LanguagesController {
    constructor (private readonly _service: LanguagesService) {
    }


    @Get()
    @UseGuards(IsUserGuard)
    getMyLanguages (
        @Req() request: Request,
    ) {
        return this._service.getMyLanguagesWithFolders(request[REQUEST_USER_ID]);
    }

    @Get(`/folder/:folderId`)
    getMyFolderWords (
        @Req() request: Request,
        @Param('folderId') folderId: string,
    ) {
        return this._service.getMyLanguageFolderWords(request[REQUEST_USER_ID], folderId);
    }

    @Get(`/user/:userId`)
    getUserLanguages (
        @Req() request: Request,
        @Param('userId') userId: string,
    ) {
        return this._service.getUserLanguages(request[REQUEST_USER_ID], userId);
    }

    @Get(`/user/folder/:folderId`)
    getUserFolderWords (
        @Req() request: Request,
        @Param('folderId') folderId: string,
    ) {
        return this._service.getLanguageFolderWords(request[REQUEST_USER_ID], folderId);
    }
}