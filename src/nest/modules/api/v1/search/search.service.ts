import { Injectable } from '@nestjs/common';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    ISearchService,
} from '@/domain/services/search/search-service.interface';
import {
    PrismaSearchService,
} from '@/domain/services/search/implementations/prisma-search.service';
import {
    assertDomainSearchOptions,
    DomainSearchOptions, isDomainSearchOptions,
} from 'product-types/dist/search/DomainSearchOptions';
import {
    assertDomainSearchItemOptions,
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    globalExceptionServiceErrorResponse
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class SearchService {
    private readonly _service: ISearchService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaSearchService(this._prisma);
    }

    async searchAll (options: DomainSearchOptions) {
        try {
            assertDomainSearchOptions(options, 'options', 'DomainSearchOptions');
            return this._service.searchAll(options);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, SearchService.name, 400, 'Search error'));
        }
    }

    async searchUsers (options: DomainSearchItemOptions) {
        try {
            assertDomainSearchItemOptions(options, 'options', 'DomainSearchOptions');
            return this._service.searchUsers(options);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, SearchService.name, 400, 'Search error'));
        }
    }
}