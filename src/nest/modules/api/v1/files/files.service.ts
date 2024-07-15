import { Injectable } from '@nestjs/common';
import { IFilesService } from '@/domain/services/files/files-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaFilesService,
} from '@/domain/services/files/implementations/prisma-files.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';


@Injectable()
export class FilesService {
    private readonly _service: IFilesService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaFilesService(this._prisma);
    }

    async getByFileId (userId: string, fileId: string) {
        try {
            return await this._service.getFileById(userId, fileId);
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'FilesService', 400, 'Cant get file'));
        }
    }

    async getByUserId (userId: string, searchParams: DomainSearchItemOptions) {
        try {
            return await this._service.getFilesByUserId(userId, searchParams);
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'FilesService', 400, 'Cant get files'));
        }
    }
}