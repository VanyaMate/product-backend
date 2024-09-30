import { Injectable } from '@nestjs/common';
import {
    IExcelFileSplitService,
} from '@/domain/services/excel-split/excel-splitter-service.interface';
import {
    PrismaXlsxExcelSplitterService,
} from '@/domain/services/excel-split/implementations/prisma-xlsx-excel-splitter.service';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaFileUploadService,
} from '@/domain/services/files-upload/implementations/prisma-file-upload.service';
import { FileService } from '@/nest/modules/services/files/file.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';
import {
    DomainExcelFileSplitData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitData';


@Injectable()
export class ExcelSplitService {
    private readonly _service: IExcelFileSplitService;

    constructor (
        private readonly _fileService: FileService,
        private readonly _prisma: PrismaService,
    ) {
        this._service = new PrismaXlsxExcelSplitterService(
            new PrismaFileUploadService(this._prisma, this._fileService),
            this._fileService,
            this._prisma,
        );
    }

    async upload (userId: string, file: Express.Multer.File) {
        try {
            return await this._service.upload(userId, file.originalname, file.mimetype, file.size, file.buffer);
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'ExcelSplitService', 400, 'Cant upload file'));
        }
    }

    async getMy (userId: string) {
        try {
            return await this._service.getMy(userId);
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'ExcelSplitService', 400, 'Cant get file'));
        }
    }

    async split (userId: string, options: DomainExcelFileSplitData) {
        try {
            return await this._service.split(userId, options);
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'ExcelSplitService', 400, 'Cant split file'));
        }
    }

    async clear (userId: string) {
        try {
            return await this._service.clear(userId);
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'ExcelSplitService', 400, 'Cant clear file'));
        }
    }
}