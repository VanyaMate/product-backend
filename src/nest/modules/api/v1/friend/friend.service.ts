import { Injectable } from '@nestjs/common';
import {
    IFriendService,
} from '@/domain/services/friend/friend-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaFriendService,
} from '@/domain/services/friend/implementations/prisma-friend.service';
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
export class FriendService {
    private readonly _service: IFriendService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notificationService: NotificationService,
    ) {
        this._service = new PrismaFriendService(this._prisma);
    }

    async add (fromUserId: string, toUserId: string) {
        try {
            const [ targets, notification ] = await this._service.add(fromUserId, toUserId);
            targets.forEach((target) => this._notificationService.friendRequest(target, notification));
            return notification;
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant add friend'));
        }
    }

    async accept (fromUserId: string, toUserId: string) {
        try {
            const [ targets, notification ] = await this._service.accept(fromUserId, toUserId);
            targets.forEach((target) => this._notificationService.friendRequestAccepted(target, notification));
            return notification;
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant add friend'));
        }
    }

    async remove (fromUserId: string, toUserId: string) {
        try {
            const [ targets, notification ] = await this._service.remove(fromUserId, toUserId);
            targets.forEach((target) => this._notificationService.friendDeleted(target, notification));
            return notification;
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant remove friend'));
        }
    }

    async cancel (fromUserId: string, toUserId: string) {
        try {
            const [ targets, notification ] = await this._service.cancel(fromUserId, toUserId);
            targets.forEach((target) => this._notificationService.friendRequestCanceled(target, notification));
            return notification;
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant cancel friend request'));
        }
    }
}