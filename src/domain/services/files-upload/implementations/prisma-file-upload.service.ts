import {
    IFilesUploadService,
} from '@/domain/services/files-upload/files-upload-service.interface';
import { PrismaClient } from '@prisma/client';
import { IFileService } from '@/domain/services/file/file-service.interface';
import { DomainFile } from 'product-types/dist/file/DomainFile';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import {
    prismaFileToDomain,
} from '@/domain/services/files-upload/converters/prismaFileToDomain';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';


export class PrismaFileUploadService implements IFilesUploadService {
    constructor (
        private readonly _prisma: PrismaClient,
        private readonly _files: IFileService,
    ) {
    }

    async save<T> (
        userId: string,
        file: T extends Express.Multer.File ? T : never,
    ): Promise<NotificationServiceResponse[]> {
        const filePath: string = await this._files.saveTo(file.mimetype, file);
        const fileData         = await this._prisma.file.create({
            data   : {
                ownerId         : userId,
                filePath        : filePath,
                fileOriginalName: file.originalname,
                fileName        : file.originalname,
                fileWeight      : file.size,
                fileType        : file.mimetype,
            },
            include: {
                owner: {
                    select: prismaDomainUserSelector,
                },
            },
        });

        return [
            [
                [ userId ],
                DomainNotificationType.FILE_UPLOADED_IN,
                {
                    file: prismaFileToDomain(fileData, fileData.owner),
                },
            ],
        ];
    }


    async remove (userId: string, fileId: string): Promise<NotificationServiceResponse[]> {
        const fileData = await this._prisma.file.delete({
            where  : { ownerId: userId, id: fileId },
            include: {
                owner: {
                    select: prismaDomainUserSelector,
                },
            },
        });
        await this._files.remove(fileData.filePath);

        return [
            [
                [ userId ],
                DomainNotificationType.FILE_DELETED_IN,
                {
                    file: prismaFileToDomain(fileData, fileData.owner),
                },
            ],
        ];
    }

    async update (userId: string, fileId: string, fileName: string): Promise<NotificationServiceResponse[]> {
        const previousFileData = await this._prisma.file.findFirst({
            where  : { ownerId: userId, id: fileId },
            include: {
                owner: {
                    select: prismaDomainUserSelector,
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
                    select: prismaDomainUserSelector,
                },
            },
        });
        await this._files.remove(fileData.filePath);

        return [
            [
                [ userId ],
                DomainNotificationType.FILE_UPDATED_IN,
                {
                    previousFile: prismaFileToDomain(previousFileData, previousFileData.owner),
                    newFile     : prismaFileToDomain(fileData, fileData.owner),
                },
            ],
        ];
    }
}