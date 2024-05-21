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


@Injectable()
export class FriendService {
    private readonly _service: IFriendService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaFriendService(this._prisma);
    }

    async add (fromUserId: string, toUserId: string) {
        try {
            return await this._service.add(fromUserId, toUserId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant add friend'));
        }
    }

    async remove (fromUserId: string, toUserId: string) {
        try {
            return await this._service.remove(fromUserId, toUserId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant remove friend'));
        }
    }

    async cancel (fromUserId: string, toUserId: string) {
        try {
            return await this._service.cancel(fromUserId, toUserId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'FriendService', 400, 'Cant cancel friend request'));
        }
    }
}