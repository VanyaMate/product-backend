import { Language } from '@prisma/client';
import { DomainLanguage } from 'product-types/dist/language/DomainLanguage';


export const prismaLanguageToDomain = function (data: Language): DomainLanguage {
    return {
        id   : data.id,
        title: data.title,
    };
};