import { LanguageWord } from '@prisma/client';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';


export const prismaLanguageWordToDomain = function (data: LanguageWord): DomainLanguageWord {
    return {
        id          : data.id,
        notice      : data.notice,
        checked     : data.checked,
        original    : data.original,
        translations: data.translations,
    };
};