import { Call } from '@prisma/client';
import { DomainCall } from 'product-types/dist/call/DomainCall';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export const prismaCallToDomain = function (call: Call, user: DomainUser, connectionId: string): DomainCall {
    return {
        id          : call.id,
        finished    : call.finished,
        creationDate: +call.creationDate,
        finishedDate: +call.finishDate,
        initiatorId : call.fromUserId,
        user        : user,
        connectionId: connectionId,
    };
};