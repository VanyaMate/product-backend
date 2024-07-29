import { LanguageFolder } from '@prisma/client';
import {
    DomainLanguageFolder,
} from 'product-types/dist/language/DomainLanguageFolder';


export const prismaLanguageFolderToDomain = function (data: LanguageFolder): DomainLanguageFolder {
    return {
        id   : data.id,
        title: data.title,
    };
};