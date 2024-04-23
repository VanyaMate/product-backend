import { Module } from '@nestjs/common';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenService } from '@/nest/modules/api/v1/token/token.service';


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