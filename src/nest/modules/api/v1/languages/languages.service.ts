import { Injectable } from '@nestjs/common';
import {
    ILanguagesService,
} from '@/domain/services/languages/languages-service.interface';
import {
    DomainLanguageWithFolders,
} from 'product-types/dist/language/DomainLanguageWithFolders';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaLanguagesService,
} from '@/domain/services/languages/implementations/prisma-languages.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class LanguagesService implements ILanguagesService {
    private readonly _service: ILanguagesService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaLanguagesService(this._prisma);
    }

    async getMyLanguagesWithFolders (userId: string): Promise<DomainLanguageWithFolders[]> {
        try {
            return await this._service.getMyLanguagesWithFolders(userId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguagesService.name, 400, 'Cant get languages'));
        }
    }

    async getMyLanguageFolderWords (userId: string, folderId: string): Promise<DomainLanguageWord[]> {
        try {
            return await this._service.getMyLanguageFolderWords(userId, folderId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguagesService.name, 400, 'Cant get words'));
        }
    }

    async getUserLanguages (userId: string, languagesUserId: string): Promise<DomainLanguageWithFolders[]> {
        try {
            return await this._service.getUserLanguages(userId, languagesUserId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguagesService.name, 400, 'Cant get languages'));
        }
    }

    async getLanguageFolderWords (userId: string, folderId: string): Promise<DomainLanguageWord[]> {
        try {
            return await this._service.getLanguageFolderWords(userId, folderId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguagesService.name, 400, 'Cant get words'));
        }
    }
}