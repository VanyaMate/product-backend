import {
    IConnectionsService,
} from '@/domain/services/connections/connections-service.interface';
import { Request, Response } from 'express';
import { REQUEST_ID_HEADER } from '@/domain/consts/request-response';
import { PrismaClient } from '@prisma/client';


export type Connect = {
    request: Request;
    response: Response;
    $__timer: ReturnType<typeof setTimeout>;
}

export class PrismaExpressConnectionsService implements IConnectionsService<Request, Response> {
    private readonly _connectionsMap = new Map<string, Map<string, Connect>>();

    constructor (private readonly _prisma: PrismaClient) {
    }

    async add (userId: string, request: Request, response: Response): Promise<void> {
        const requestId: string | undefined = request.header(REQUEST_ID_HEADER);
        console.log('requestId', requestId);
        if (requestId) {
            let connectionsByUserId = this._connectionsMap.get(userId);

            if (!connectionsByUserId) {
                connectionsByUserId = new Map<string, Connect>();
                this._connectionsMap.set(userId, connectionsByUserId);
            }

            const connectByRequest = connectionsByUserId.get(requestId);
            console.log('connectByRequest', connectByRequest);
            if (!connectByRequest) {
                this._addToConnection(connectionsByUserId, userId, requestId, request, response);
                await this._prisma.connection.create({
                    data: {
                        user_id      : userId,
                        connection_id: requestId,
                    },
                }).catch();
                console.log('added', connectByRequest);
            } else {
                clearTimeout(connectByRequest.$__timer);
                this._addToConnection(connectionsByUserId, userId, requestId, request, response);
            }
        }
        console.log(this._connectionsMap);
    }

    async remove (userId: string, request: Request): Promise<void> {
        throw new Error('Method not implemented.');
    }

    getAllByUserId (userId: string): Response[] {
        const connections: Connect[] = [];
        this._connectionsMap.get(userId).forEach((connect) => connections.push(connect));
        return connections.map((connection) => connection.response);
    }

    private _addToConnection (userConnectionsMap: Map<string, Connect>, userId: string, requestId: string, request: Request, response: Response) {
        let closed: boolean = false;
        response.on('close', () => {
            if (!closed) {
                closed = true;
                userConnectionsMap.delete(requestId);
                this._prisma.connection.delete({
                    where: {
                        user_id      : userId,
                        connection_id: requestId,
                    },
                }).catch();
            }
        });
        userConnectionsMap.set(requestId, {
            request,
            response,
            $__timer: setTimeout(() => {
                if (!closed) {
                    closed = true;
                    response.end();
                    userConnectionsMap.delete(requestId);
                    this._prisma.connection.delete({
                        where: {
                            user_id      : userId,
                            connection_id: requestId,
                        },
                    }).catch();
                }
            }, 1000 * 20),
        });
    }
}