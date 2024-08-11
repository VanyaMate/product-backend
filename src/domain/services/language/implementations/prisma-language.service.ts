import {
    ILanguageService,
} from '@/domain/services/language/language-service.interface';
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
    NotificationServiceResponse,
} from '../../notification/types/NotificationServiceResponse';
import { PrismaClient } from '@prisma/client';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    prismaLanguageToDomain,
} from '@/domain/services/language/converters/prismaLanguageToDomain';
import {
    prismaLanguageFolderToDomain,
} from '@/domain/services/language/converters/prismaLanguageFolderToDomain';
import {
    prismaLanguageWordToDomain,
} from '@/domain/services/language/converters/prismaLanguageWordToDomain';


export class PrismaLanguageService implements ILanguageService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async createLanguage (userId: string, createData: DomainLanguageCreateData): Promise<NotificationServiceResponse[]> {
        const language = await this._prisma.language.create({
            data   : {
                title  : createData.title,
                ownerId: userId,
            },
            include: {
                owner: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_CREATED_IN,
                {
                    language: prismaLanguageToDomain(language),
                    owner   : prismaUserToDomain(language.owner),
                },
            ],
        ];
    }

    async updateLanguage (userId: string, languageId: string, updateData: DomainLanguageUpdateData): Promise<NotificationServiceResponse[]> {
        const language = await this._prisma.language.update({
            where  : {
                ownerId: userId,
                id     : languageId,
            },
            data   : {
                title: updateData.title,
            },
            include: {
                owner: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_UPDATED_IN,
                {
                    language: prismaLanguageToDomain(language),
                    owner   : prismaUserToDomain(language.owner),
                },
            ],
        ];
    }

    async removeLanguage (userId: string, languageId: string): Promise<NotificationServiceResponse[]> {
        const language = await this._prisma.language.delete({
            where  : {
                ownerId: userId,
                id     : languageId,
            },
            include: {
                owner: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_DELETED_IN,
                {
                    language: prismaLanguageToDomain(language),
                    owner   : prismaUserToDomain(language.owner),
                },
            ],
        ];
    }

    async createFolder (userId: string, languageId: string, createData: DomainLanguageFolderCreateData): Promise<NotificationServiceResponse[]> {
        const folder = await this._prisma.languageFolder.create({
            data   : {
                languageId,
                ownerId: userId,
                title  : createData.title,
            },
            include: {
                owner   : {
                    include: prismaToDomainUserInclude,
                },
                language: true,
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_FOLDER_CREATED_IN,
                {
                    folder  : prismaLanguageFolderToDomain(folder),
                    language: prismaLanguageToDomain(folder.language),
                    owner   : prismaUserToDomain(folder.owner),
                },
            ],
        ];
    }

    async updateFolder (userId: string, folderId: string, updateData: DomainLanguageFolderUpdateData): Promise<NotificationServiceResponse[]> {
        const folder = await this._prisma.languageFolder.update({
            where  : {
                ownerId: userId,
                id     : folderId,
            },
            data   : {
                title: updateData.title,
            },
            include: {
                owner   : {
                    include: prismaToDomainUserInclude,
                },
                language: true,
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_FOLDER_UPDATED_IN,
                {
                    folder  : prismaLanguageFolderToDomain(folder),
                    language: prismaLanguageToDomain(folder.language),
                    owner   : prismaUserToDomain(folder.owner),
                },
            ],
        ];
    }

    async removeFolder (userId: string, folderId: string): Promise<NotificationServiceResponse[]> {
        const folder = await this._prisma.languageFolder.delete({
            where  : {
                ownerId: userId,
                id     : folderId,
            },
            include: {
                owner   : {
                    include: prismaToDomainUserInclude,
                },
                language: true,
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_FOLDER_DELETED_IN,
                {
                    folder  : prismaLanguageFolderToDomain(folder),
                    language: prismaLanguageToDomain(folder.language),
                    owner   : prismaUserToDomain(folder.owner),
                },
            ],
        ];
    }

    async createWord (userId: string, folderId: string, createData: DomainLanguageWordCreateData): Promise<NotificationServiceResponse[]> {
        const word = await this._prisma.languageWord.create({
            data   : {
                folderId,
                ownerId     : userId,
                original    : createData.original,
                translations: createData.translations,
                notice      : createData.notice,
            },
            include: {
                owner : {
                    include: prismaToDomainUserInclude,
                },
                folder: {
                    include: {
                        language: true,
                    },
                },
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_WORD_CREATED_IN,
                {
                    word    : prismaLanguageWordToDomain(word),
                    folder  : prismaLanguageFolderToDomain(word.folder),
                    language: prismaLanguageToDomain(word.folder.language),
                    owner   : prismaUserToDomain(word.owner),
                },
            ],
        ];
    }

    async updateWord (userId: string, wordId: string, updateData: DomainLanguageWordUpdateData): Promise<NotificationServiceResponse[]> {
        const _dataToUpdate: DomainLanguageWordUpdateData = {};
        if (updateData.checked !== undefined) {
            _dataToUpdate.checked = updateData.checked;
        }

        if (updateData.original !== undefined) {
            _dataToUpdate.original = updateData.original;
        }

        if (updateData.notice !== undefined) {
            _dataToUpdate.notice = updateData.notice;
        }

        if (updateData.translations !== undefined) {
            _dataToUpdate.translations = updateData.translations;
        }

        const word = await this._prisma.languageWord.update({
            where  : {
                ownerId: userId,
                id     : wordId,
            },
            data   : _dataToUpdate,
            include: {
                owner : {
                    include: prismaToDomainUserInclude,
                },
                folder: {
                    include: {
                        language: true,
                    },
                },
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_WORD_UPDATED_IN,
                {
                    word    : prismaLanguageWordToDomain(word),
                    folder  : prismaLanguageFolderToDomain(word.folder),
                    language: prismaLanguageToDomain(word.folder.language),
                    owner   : prismaUserToDomain(word.owner),
                },
            ],
        ];
    }

    async removeWord (userId: string, wordId: string): Promise<NotificationServiceResponse[]> {
        const word = await this._prisma.languageWord.delete({
            where  : {
                ownerId: userId,
                id     : wordId,
            },
            include: {
                owner : {
                    include: prismaToDomainUserInclude,
                },
                folder: {
                    include: {
                        language: true,
                    },
                },
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.LANGUAGE_WORD_DELETED_IN,
                {
                    word    : prismaLanguageWordToDomain(word),
                    folder  : prismaLanguageFolderToDomain(word.folder),
                    language: prismaLanguageToDomain(word.folder.language),
                    owner   : prismaUserToDomain(word.owner),
                },
            ],
        ];
    }
}