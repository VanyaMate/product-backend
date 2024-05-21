import { Injectable } from '@nestjs/common';
import {
    IFriendsService,
} from '@/domain/services/friends/friends-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaFriendsService,
} from '@/domain/services/friends/implementations/prisma-friends.service';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


@Injectable()
export class FriendsService implements IFriendsService {
    private readonly _service: IFriendsService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaFriendsService(this._prisma);
    }

    async getFriendsOfUserByUserId (userId: string): Promise<DomainUser[]> {
        try {
            return await this._service.getFriendsOfUserByUserId(userId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, FriendsService.name, 400, 'Cant get friends'));
        }
    }

    async getFriendRequestsSentByUserId (userId: string): Promise<DomainUser[]> {
        try {
            return await this._service.getFriendRequestsSentByUserId(userId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, FriendsService.name, 400, 'Cant get sent friend requests'));
        }
    }

    async getFriendRequestsReceivedByUserId (userId: string): Promise<DomainUser[]> {
        try {
            return await this._service.getFriendRequestsReceivedByUserId(userId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, FriendsService.name, 400, 'Cant get received friend requests'));
        }
    }

    async getFriendRequestsByUserId (userId: string): Promise<[ DomainUser[], DomainUser[] ]> {
        try {
            return await this._service.getFriendRequestsByUserId(userId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, FriendsService.name, 400, 'Cant get friend requests'));
        }
    }
}