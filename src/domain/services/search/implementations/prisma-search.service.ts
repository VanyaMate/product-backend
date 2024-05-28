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
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';


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

    private async _findData (searchIn: string, query: string): Promise<unknown> {
        switch (searchIn) {
            case 'profiles':
                const userWhereInput: Prisma.UserWhereInput = { login: { startsWith: query } };
                const userCountArgs: Prisma.UserCountArgs   = {
                    where: userWhereInput,
                };
                const userQuery: Prisma.UserFindManyArgs    = {
                    where  : userWhereInput,
                    select : prismaDomainUserSelector,
                    take   : 10,
                    orderBy: { login: 'asc' },
                };

                return this._prisma.$transaction([
                    this._prisma.user.count(userCountArgs),
                    this._prisma.user.findMany(userQuery),
                ]);
            default:
                return null;
        }
    }
}