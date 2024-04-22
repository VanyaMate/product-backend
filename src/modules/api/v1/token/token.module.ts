import { Module } from '@nestjs/common';
import { TokenService } from '@/modules/api/v1/token/token.service';
import { ServicesModule } from '@/modules/services/services.module';


@Module({
    imports  : [
        ServicesModule,
    ],
    providers: [
        TokenService,
    ],
    exports  : [
        TokenService,
    ],
})
export class TokenModule {
}