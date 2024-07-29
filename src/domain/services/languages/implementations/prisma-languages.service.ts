import {
    ILanguagesService,
} from '@/domain/services/languages/languages-service.interface';
import { PrismaClient } from '@prisma/client';
import {
    DomainLanguageWithFolders,
} from 'product-types/dist/language/DomainLanguageWithFolders';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';
import {
    prismaLanguageToDomain,
} from '@/domain/services/language/converters/prismaLanguageToDomain';
import {
    prismaLanguageFolderToDomain,
} from '@/domain/services/language/converters/prismaLanguageFolderToDomain';
import {
    prismaLanguageWordToDomain,
} from '@/domain/services/language/converters/prismaLanguageWordToDomain';


export class PrismaLanguagesService implements ILanguagesService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getMyLanguagesWithFolders (userId: string): Promise<DomainLanguageWithFolders[]> {
        const languages = await this._prisma.language.findMany({
            where  : { ownerId: userId },
            include: {
                folders: true,
            },
        });

        return languages.map((language) => {
            return {
                ...prismaLanguageToDomain(language),
                folders: language.folders.map(prismaLanguageFolderToDomain),
            };
        });
    }

    async getMyLanguageFolderWords (userId: string, folderId: string): Promise<DomainLanguageWord[]> {
        const words = await this._prisma.languageWord.findMany({
            where: { folderId },
        });

        return words.map(prismaLanguageWordToDomain);
    }

    async getUserLanguages (userId: string, languagesUserId: string): Promise<DomainLanguageWithFolders[]> {
        const languages = await this._prisma.language.findMany({
            where  : { ownerId: languagesUserId },
            include: {
                folders: true,
            },
        });

        return languages.map((language) => {
            return {
                ...prismaLanguageToDomain(language),
                folders: language.folders.map(prismaLanguageFolderToDomain),
            };
        });
    }

    async getLanguageFolderWords (userId: string, folderId: string): Promise<DomainLanguageWord[]> {
        const words = await this._prisma.languageWord.findMany({
            where: { folderId },
        });

        return words.map(prismaLanguageWordToDomain);
    }
}