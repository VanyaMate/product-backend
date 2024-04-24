import {
    IConnectionsService,
} from '@/domain/services/connections/connections-service.interface';
import { Request, Response } from 'express';
import { REQUEST_ID_HEADER } from '@/domain/consts/request-response';
import { PrismaClient } from '@prisma/client';
import {
    DomainNotification,
    NotificationType,
} from 'product-types/dist/notification/DomainNotification';


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
        if (requestId) {
            let connectionsByUserId = this._connectionsMap.get(userId);

            if (!connectionsByUserId) {
                connectionsByUserId = new Map<string, Connect>();
                this._connectionsMap.set(userId, connectionsByUserId);
            }

            const connectByRequest = connectionsByUserId.get(requestId);
            if (!connectByRequest) {
                this._addToConnection(connectionsByUserId, userId, requestId, request, response);
                await this._prisma.connection.create({
                    data: {
                        user_id      : userId,
                        connection_id: requestId,
                    },
                }).catch();
            } else {
                clearTimeout(connectByRequest.$__timer);
                this._addToConnection(connectionsByUserId, userId, requestId, request, response);
            }
        }
    }

    async remove (userId: string, request: Request): Promise<void> {
        const userConnectionsMap            = this._connectionsMap.get(userId);
        const requestId: string | undefined = request.header(REQUEST_ID_HEADER);
        if (userConnectionsMap && requestId) {
            return this._deleteConnection(userConnectionsMap, userId, requestId).then();
        }
    }

    getAllByUserId (userId: string): Response[] {
        const connections: Connect[] = [];
        this._connectionsMap.get(userId).forEach((connect) => connections.push(connect));
        return connections.map((connection) => connection.response);
    }

    private _addToConnection (userConnectionsMap: Map<string, Connect>, userId: string, requestId: string, request: Request, response: Response) {
        let closed: boolean   = false;
        const closeConnection = async () => {
            if (!closed) {
                closed = true;
                return this._deleteConnection(userConnectionsMap, userId, requestId);
            }
        };

        response.on('close', closeConnection.bind(this));
        userConnectionsMap.set(requestId, {
            request,
            response,
            $__timer: setTimeout(() => {
                // TODO: TEMP
                response.write(`data: ${ JSON.stringify({
                    type: NotificationType.DISCONNECTED, dateMs: Date.now(), data: 'time',
                } as DomainNotification) }\n\n`);
                closeConnection().then(() => response.end());
            }, 1000 * 20),
        });
    }

    private async _deleteConnection (userConnectionsMap: Map<string, Connect>, userId: string, requestId: string) {
        userConnectionsMap.delete(requestId);
        return this._prisma.connection.delete({
            where: {
                user_id      : userId,
                connection_id: requestId,
            },
        }).catch();
    }
}