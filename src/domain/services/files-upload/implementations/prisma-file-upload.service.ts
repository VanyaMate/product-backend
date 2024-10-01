import {
    IFilesUploadService,
} from '@/domain/services/files-upload/files-upload-service.interface';
import { PrismaClient } from '@prisma/client';
import { IFileService } from '@/domain/services/file/file-service.interface';
import {
    prismaFileToDomain,
} from '@/domain/services/files-upload/converters/prismaFileToDomain';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';


export class PrismaFileUploadService implements IFilesUploadService {
    constructor (
        private readonly _prisma: PrismaClient,
        private readonly _files: IFileService,
    ) {
    }

    async save (
        userId: string,
        fileName: string,
        fileMimetype: string,
        fileSize: number,
        fileBuffer: Buffer,
    ): Promise<NotificationServiceResponse[]> {
        const fileNameUtf8     = this._getValidFileName(fileName);
        const filePath: string = await this._files.saveTo(fileMimetype, fileNameUtf8, fileBuffer);
        const fileData         = await this._prisma.file.create({
            data   : {
                ownerId         : userId,
                filePath        : filePath,
                fileOriginalName: fileNameUtf8,
                fileName        : fileNameUtf8,
                fileWeight      : fileSize,
                fileType        : fileMimetype,
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
                DomainNotificationType.FILE_UPLOADED_IN,
                {
                    file: prismaFileToDomain(fileData, prismaUserToDomain(fileData.owner)),
                },
            ],
        ];
    }


    async remove (userId: string, fileId: string): Promise<NotificationServiceResponse[]> {
        const fileData = await this._prisma.file.delete({
            where  : { ownerId: userId, id: fileId },
            include: {
                owner: {
                    include: prismaToDomainUserInclude,
                },
            },
        });
        await this._files.remove(fileData.filePath);

        return [
            [
                [ userId ],
                DomainNotificationType.FILE_DELETED_IN,
                {
                    file: prismaFileToDomain(fileData, prismaUserToDomain(fileData.owner)),
                },
            ],
        ];
    }

    async update (userId: string, fileId: string, fileName: string): Promise<NotificationServiceResponse[]> {
        const previousFileData = await this._prisma.file.findFirst({
            where  : { ownerId: userId, id: fileId },
            include: {
                owner: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        if (!previousFileData) {
            throw 'File not exist';
        }

        const fileData = await this._prisma.file.update({
            where  : { ownerId: userId, id: fileId },
            data   : { fileName },
            include: {
                owner: {
                    include: prismaToDomainUserInclude,
                },
            },
        });
        await this._files.remove(fileData.filePath);

        return [
            [
                [ userId ],
                DomainNotificationType.FILE_UPDATED_IN,
                {
                    previousFile: prismaFileToDomain(previousFileData, prismaUserToDomain(previousFileData.owner)),
                    newFile     : prismaFileToDomain(fileData, prismaUserToDomain(fileData.owner)),
                },
            ],
        ];
    }

    private _getValidFileName (fileName: string): string {
        return Buffer.from(fileName, 'latin1').toString('utf8');
    }
}