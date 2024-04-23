import { Injectable } from '@nestjs/common';
import {
    IConnectionsService,
} from '@/domain/services/connections/connections-service.interface';
import { Request, Response } from 'express';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaExpressConnectionsService,
} from '@/domain/services/connections/implementations/prisma-express-connections.service';


@Injectable()
export class NotificationService {
    private readonly _connectionService: IConnectionsService<Request, Response>;

    constructor (private readonly _prisma: PrismaService) {
        this._connectionService = new PrismaExpressConnectionsService(this._prisma);
    }

    add (userId: string, request: Request, response: Response) {
        this._connectionService.add(userId, request, response);
    }

    async sendToUser (login: string, message: string) {
        const user      = await this._prisma.user.findFirstOrThrow({ where: { login } });
        const responses = this._connectionService.getAllByUserId(user.id);
        responses.forEach((response) => response.write(`data: ${ message }\n\n`));
    }
}