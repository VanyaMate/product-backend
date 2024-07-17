import { IFilesService } from '@/domain/services/files/files-service.interface';
import { PrismaClient } from '@prisma/client';
import { DomainFile } from 'product-types/dist/file/DomainFile';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import {
    prismaFileToDomain,
} from '@/domain/services/files-upload/converters/prismaFileToDomain';


export class PrismaFilesService implements IFilesService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getFileById (userId: string, fileId: string): Promise<DomainFile> {
        const fileData = await this._prisma.file.findFirst({
            where  : {
                OR: [
                    { ownerId: userId, id: fileId },
                    { id: fileId, private: false },
                ],
            },
            include: {
                owner: {
                    select: prismaDomainUserSelector,
                },
            },
        });

        return prismaFileToDomain(fileData, fileData.owner);
    }

    getFilesByIds (userId: string, filesIds: string[]): Promise<DomainFile[]> {
        throw new Error('Method not implemented.');
    }

    async getFilesByUserId (userId: string, searchOptions: DomainSearchItemOptions): Promise<DomainSearchItem> {
        const [ files, count ] = await this._prisma.$transaction([
            this._prisma.file.findMany({
                where  : {
                    ownerId : userId,
                    fileName: searchOptions.query,
                },
                include: {
                    owner: { select: prismaDomainUserSelector },
                },
                take   : searchOptions.limit,
                skip   : searchOptions.offset,
                orderBy: {
                    id: 'desc',
                },
            }),
            this._prisma.file.count({
                where: {
                    ownerId : userId,
                    fileName: searchOptions.query,
                },
            }),
        ]);

        return {
            count,
            list: files.map((file) => prismaFileToDomain(file, file.owner)),
        };
    }

    getFilesByUserIdWithCursor (userId: string, cursorOptions: DomainSearchCursorOptions): Promise<DomainSearchItem> {
        throw new Error('Method not implemented.');
    }
}