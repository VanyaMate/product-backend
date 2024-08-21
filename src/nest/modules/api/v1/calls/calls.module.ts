import { Module } from '@nestjs/common';
import { CallsController } from '@/nest/modules/api/v1/calls/calls.controller';
import { CallsService } from '@/nest/modules/api/v1/calls/calls.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    controllers: [ CallsController ],
    providers  : [ CallsService ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class CallsModule {

}