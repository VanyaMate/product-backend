import { Injectable } from '@nestjs/common';
import {
    IFilesUploadService,
} from '@/domain/services/files-upload/files-upload-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { FileService } from '@/nest/modules/services/files/file.service';
import {
    PrismaFileUploadService,
} from '@/domain/services/files-upload/implementations/prisma-file-upload.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class FilesUploadService {
    private readonly _service: IFilesUploadService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _files: FileService,
        private readonly _notificationService: NotificationService,
    ) {
        this._service = new PrismaFileUploadService(this._prisma, this._files);
    }

    async save (userId: string, file: Express.Multer.File) {
        try {
            const [ active ] = await this._service.save(userId, file);
            this._notificationService.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'FilesUploadService', 400, 'Cant upload file'));
        }
    }

    async remove (userId: string, fileId: string) {
        try {
            const [ active ] = await this._service.remove(userId, fileId);
            this._notificationService.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'FilesUploadService', 400, 'Cant remove file'));
        }
    }

    async update (userId: string, fileId: string, fileName: string) {
        try {
            const [ active ] = await this._service.update(userId, fileId, fileName);
            this._notificationService.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'FilesUploadService', 400, 'Cant update file'));
        }
    }
}