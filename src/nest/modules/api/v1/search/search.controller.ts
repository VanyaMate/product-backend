import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { SearchService } from '@/nest/modules/api/v1/search/search.service';
import {
    SearchOptionsDto,
} from '@/nest/modules/api/v1/search/dto/search-options.dto';
import { DomainSearch } from 'product-types/dist/search/DomainSearch';
import {
    SearchUsersOptionsDto,
} from '@/nest/modules/api/v1/search/dto/search-users-options.dto';


@Controller('/api/v1/search')
export class SearchController {
    constructor (private readonly _service: SearchService) {
    }

    @Get()
    @UseGuards(IsUserGuard)
    searchAll (
        @Query() queries: SearchOptionsDto,
    ) {
        return this._service.searchAll({
            query   : queries.query,
            searchIn: queries.searchIn.split(',') as (keyof DomainSearch)[],
        });
    }

    @Get('/users')
    @UseGuards(IsUserGuard)
    searchProfiles (
        @Query() queries: SearchUsersOptionsDto,
    ) {
        return this._service.searchUsers({
            query : queries.query,
            limit : queries.limit ?? 10,
            offset: queries.offset ?? 0,
        });
    }
}