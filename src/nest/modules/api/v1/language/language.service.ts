import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    ILanguageService,
} from '@/domain/services/language/language-service.interface';
import {
    PrismaLanguageService,
} from '@/domain/services/language/implementations/prisma-language.service';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainLanguageCreateData,
} from 'product-types/dist/language/DomainLanguageCreateData';
import {
    DomainLanguageFolderCreateData,
} from 'product-types/dist/language/DomainLanguageFolderCreateData';
import {
    DomainLanguageFolderUpdateData,
} from 'product-types/dist/language/DomainLanguageFolderUpdateData';
import {
    DomainLanguageUpdateData,
} from 'product-types/dist/language/DomainLanguageUpdateData';
import {
    DomainLanguageWordCreateData,
} from 'product-types/dist/language/DomainLanguageWordCreateData';
import {
    DomainLanguageWordUpdateData,
} from 'product-types/dist/language/DomainLanguageWordUpdateData';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';


@Injectable()
export class LanguageService {
    private readonly _service: ILanguageService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notifications: NotificationService,
    ) {
        this._service = new PrismaLanguageService(this._prisma);
    }

    async createLanguage (userId: string, createData: DomainLanguageCreateData) {
        try {
            const [ active ] = await this._service.createLanguage(userId, createData);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant create language'));
        }
    }

    async updateLanguage (userId: string, languageId: string, updateData: DomainLanguageUpdateData) {
        try {
            const [ active ] = await this._service.updateLanguage(userId, languageId, updateData);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant update language'));
        }
    }

    async removeLanguage (userId: string, languageId: string) {
        try {
            const [ active ] = await this._service.removeLanguage(userId, languageId);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant remove language'));
        }
    }

    async createFolder (userId: string, languageId: string, createData: DomainLanguageFolderCreateData) {
        try {
            const [ active ] = await this._service.createFolder(userId, languageId, createData);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant create folder'));
        }
    }

    async updateFolder (userId: string, folderId: string, updateData: DomainLanguageFolderUpdateData) {
        try {
            const [ active ] = await this._service.updateFolder(userId, folderId, updateData);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant update folder'));
        }
    }

    async removeFolder (userId: string, folderId: string) {
        try {
            const [ active ] = await this._service.removeFolder(userId, folderId);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant remove folder'));
        }
    }

    async createWord (userId: string, folderId: string, createData: DomainLanguageWordCreateData) {
        try {
            const [ active ] = await this._service.createWord(userId, folderId, createData);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant create word'));
        }
    }

    async updateWord (userId: string, wordId: string, updateData: DomainLanguageWordUpdateData) {
        try {
            const [ active ] = await this._service.updateWord(userId, wordId, updateData);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant update word'));
        }
    }

    async removeWord (userId: string, wordId: string) {
        try {
            const [ active ] = await this._service.removeWord(userId, wordId);
            this._notifications.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, LanguageService.name, 400, 'Cant remove word'));
        }
    }
}