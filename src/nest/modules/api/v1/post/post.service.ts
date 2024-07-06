import { Injectable } from '@nestjs/common';
import { IPostService } from '@/domain/services/post/post-service.interface';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';
import {
    DomainPostUpdateData,
} from 'product-types/dist/post/DomainPostUpdateData';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPostService,
} from '@/domain/services/post/implementations/prisma-post.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';


@Injectable()
export class PostService {
    private readonly _service: IPostService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notification: NotificationService,
    ) {
        this._service = new PrismaPostService(this._prisma);
    }

    async create (userId: string, data: DomainPostCreateData) {
        try {
            const [ active, passive ] = await this._service.create(userId, data);
            this._notification.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PostService.name, 400, 'Cant create post'));
        }
    }

    async update (userId: string, postId: string, data: DomainPostUpdateData) {
        try {
            const [ active, passive ] = await this._service.update(userId, postId, data);
            this._notification.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PostService.name, 400, 'Cant create post'));
        }
    }

    async remove (userId: string, postId: string) {
        try {
            const [ active, passive ] = await this._service.remove(userId, postId);
            this._notification.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PostService.name, 400, 'Cant create post'));
        }
    }
}