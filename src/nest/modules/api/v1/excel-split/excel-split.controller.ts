import {
    Body,
    Controller, Delete, Get,
    Post, StreamableFile,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ExcelSplitService,
} from '@/nest/modules/api/v1/excel-split/excel-split.service';
import { UserId } from '@/nest/decorators/userid.decorator';
import {
    ExcelSplitOptionsDto,
} from '@/nest/modules/api/v1/excel-split/dto/excel-split-options.dto';


@Controller(`api/v1/excel`)
export class ExcelSplitController {
    constructor (private readonly _service: ExcelSplitService) {
    }

    @Post()
    @UseGuards(IsUserGuard)
    @UseInterceptors(FileInterceptor('file'))
    upload (
        @UserId() userId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this._service.upload(userId, file);
    }

    @Get()
    @UseGuards(IsUserGuard)
    getMy (@UserId() userId: string) {
        return this._service.getMy(userId);
    }

    @Delete()
    @UseGuards(IsUserGuard)
    clear (@UserId() userId: string) {
        return this._service.clear(userId);
    }

    @Post(`/split`)
    @UseGuards(IsUserGuard)
    split (
        @UserId() userId: string,
        @Body() options: ExcelSplitOptionsDto,
    ) {
        return this._service.split(userId, options);
    }
}