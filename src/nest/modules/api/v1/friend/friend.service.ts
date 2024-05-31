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
            const [ active, passive ] = await this._service.add(fromUserId, toUserId);
            active[0].forEach((target) => this._notificationService.friendRequestIn(target, active[1]));
            passive[0].forEach((target) => this._notificationService.friendRequestOut(target, passive[1]));
            return active[1];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant add friend'));
        }
    }

    async accept (fromUserId: string, toUserId: string) {
        try {
            const [ active, passive ] = await this._service.accept(fromUserId, toUserId);
            active[0].forEach((target) => this._notificationService.friendRequestAcceptedIn(target, active[1]));
            passive[0].forEach((target) => this._notificationService.friendRequestAcceptedOut(target, passive[1]));
            return active[1];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant add friend'));
        }
    }

    async remove (fromUserId: string, toUserId: string) {
        try {
            const [ active, passive ] = await this._service.remove(fromUserId, toUserId);
            active[0].forEach((target) => this._notificationService.friendDeletedIn(target, active[1]));
            passive[0].forEach((target) => this._notificationService.friendDeletedOut(target, passive[1]));
            return active[1];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant remove friend'));
        }
    }

    async cancel (fromUserId: string, toUserId: string) {
        try {
            const [ active, passive ] = await this._service.cancel(fromUserId, toUserId);
            active[0].forEach((target) => this._notificationService.friendRequestCanceledIn(target, active[1]));
            passive[0].forEach((target) => this._notificationService.friendRequestCanceledOut(target, passive[1]));
            return active[1];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant cancel friend request'));
        }
    }
}