import { File } from '@prisma/client';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { DomainFile } from 'product-types/dist/file/DomainFile';


export const prismaFileToDomain = function (data: File, owner: DomainUser): DomainFile {
    return {
        id              : data.id,
        filePath        : data.filePath,
        fileOriginalName: data.fileOriginalName,
        fileName        : data.fileName,
        fileWeight      : data.fileWeight,
        fileType        : data.fileType,
        uploadDate      : data.uploadDate.toUTCString(),
        private         : data.private,
        owner           : owner,
    };
};