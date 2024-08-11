import {
    ISearchService,
} from '@/domain/services/search/search-service.interface';
import { Prisma, PrismaClient } from '@prisma/client';
import { DomainSearch } from 'product-types/dist/search/DomainSearch';
import {
    DomainSearchOptions,
} from 'product-types/dist/search/DomainSearchOptions';
import {
    prismaDomainUserSelector,
} from '@/domain/services/users/selectors/prisma/prisma-domain-user.selector';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    prismaDomainUserWithPermissionsSelector,
} from '@/domain/services/users/selectors/prisma/prisma-domain-user-with-permissions.selector';
import {
    prismaToDomainFullUserInclude,
} from '@/domain/services/users/include/prisma/prisma-full-user.inculde';
import {
    prismaUserToPermissionsDomain,
} from '@/domain/services/users/converters/prismaUserToPermissionsDomain';


export class PrismaSearchService implements ISearchService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async searchAll (options: DomainSearchOptions): Promise<DomainSearch> {
        const { searchIn, query } = options;
        const queries             = [];
        const response            = {};

        const searchInList = new Set(searchIn.filter(Boolean));

        searchInList.forEach((searchName) => {
            queries.push(
                this._findData(searchName, query)
                    .then((data) => response[searchName] = data),
            );
        });

        await Promise.all(queries);
        return response;
    }

    public async searchUsers (options: DomainSearchItemOptions): Promise<DomainSearchItem> {
        return this._findData('users', options.query, options.limit, options.offset);
    }

    private async _findData (searchIn: keyof DomainSearch, query: string, take: number = 10, skip: number = 0): Promise<DomainSearchItem> {
        switch (searchIn) {
            case 'users':
                const userWhereInput: Prisma.UserWhereInput = { login: { startsWith: query } };
                const userCountArgs: Prisma.UserCountArgs   = {
                    where: userWhereInput,
                };
                const userQuery: Prisma.UserFindManyArgs    = {
                    where  : userWhereInput,
                    orderBy: { login: 'asc' },
                    take,
                    skip,
                };

                const [ count, list ] = await this._prisma.$transaction([
                    this._prisma.user.count(userCountArgs),
                    this._prisma.user.findMany({
                        ...userQuery,
                        include: prismaToDomainFullUserInclude,
                    }),
                ]);

                return {
                    count,
                    list: list.map(prismaUserToPermissionsDomain),
                };
            default:
                return null;
        }
    }
}