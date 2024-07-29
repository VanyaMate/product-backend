import {
    Body,
    Controller,
    Delete, Param,
    Patch,
    Post, Req,
    UseGuards,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    LanguageCreateDataDto,
} from '@/nest/modules/api/v1/language/dto/language-create-data.dto';
import { Request } from 'express';
import {
    LanguageService,
} from '@/nest/modules/api/v1/language/language.service';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';
import {
    LanguageUpdateDataDto,
} from '@/nest/modules/api/v1/language/dto/language-update-data.dto';
import {
    LanguageFolderCreateDataDto,
} from '@/nest/modules/api/v1/language/dto/language-folder-create-data.dto';
import {
    LanguageFolderUpdateDataDto,
} from '@/nest/modules/api/v1/language/dto/language-folder-update-data.dto';
import {
    LanguageWordCreateDataDto,
} from '@/nest/modules/api/v1/language/dto/language-word-create-data.dto';
import {
    LanguageWordUpdateDataDto,
} from '@/nest/modules/api/v1/language/dto/language-word-update-data.dto';


@Controller(`api/v1/language`)
export class LanguageController {
    constructor (private readonly _service: LanguageService) {
    }

    @Post()
    @UseGuards(IsUserGuard)
    createLanguage (
        @Body() createData: LanguageCreateDataDto,
        @Req() request: Request,
    ) {
        return this._service.createLanguage(request[REQUEST_USER_ID], createData);
    }

    @Patch(`:languageId`)
    updateLanguage (
        @Param('languageId') languageId: string,
        @Body() updateData: LanguageUpdateDataDto,
        @Req() request: Request,
    ) {
        return this._service.updateLanguage(request[REQUEST_USER_ID], languageId, updateData);
    }

    @Delete(`:languageId`)
    removeLanguage (
        @Param('languageId') languageId: string,
        @Req() request: Request,
    ) {
        return this._service.removeLanguage(request[REQUEST_USER_ID], languageId);
    }

    @Post(`/folder/:languageId`)
    createFolder (
        @Param('languageId') languageId: string,
        @Body() createData: LanguageFolderCreateDataDto,
        @Req() request: Request,
    ) {
        return this._service.createFolder(request[REQUEST_USER_ID], languageId, createData);
    }

    @Patch(`/folder/:folderId`)
    updateFolder (
        @Param('folderId') folderId: string,
        @Body() updateData: LanguageFolderUpdateDataDto,
        @Req() request: Request,
    ) {
        return this._service.updateFolder(request[REQUEST_USER_ID], folderId, updateData);
    }

    @Delete(`/folder/:folderId`)
    removeFolder (
        @Param('folderId') folderId: string,
        @Req() request: Request,
    ) {
        return this._service.removeFolder(request[REQUEST_USER_ID], folderId);
    }

    @Post(`/word/:folderId`)
    createWord (
        @Param('folderId') folderId: string,
        @Body() createData: LanguageWordCreateDataDto,
        @Req() request: Request,
    ) {
        return this._service.createWord(request[REQUEST_USER_ID], folderId, createData);
    }

    @Patch(`/word/:wordId`)
    updateWord (
        @Param('wordId') wordId: string,
        @Body() updateData: LanguageWordUpdateDataDto,
        @Req() request: Request,
    ) {
        return this._service.updateWord(request[REQUEST_USER_ID], wordId, updateData);
    }

    @Delete(`/word/:wordId`)
    removeWord (
        @Param('wordId') wordId: string,
        @Req() request: Request,
    ) {
        return this._service.removeWord(request[REQUEST_USER_ID], wordId);
    }
}