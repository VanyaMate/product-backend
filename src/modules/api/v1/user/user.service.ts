import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/services/prisma/prisma.service';
import { serviceErrorResponse } from 'product-types';
import {
    userPrismaToDomain,
} from '@/domain/services/user/prisma-mongo/converters/userPrismaToDomain';
import { DomainServiceErrorException } from '@/exceptions/domain-service-error.exception';


@Injectable()
export class UserService {
    constructor (private readonly _prisma: PrismaService) {
    }

    async getUserByLogin (login: string) {
        try {
            return {
                data: userPrismaToDomain(
                    await this._prisma.user.findFirstOrThrow({ where: { login } }),
                ),
            };
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }
}