import {
    Controller,
    Post, StreamableFile,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ExcelSplitterService,
} from '@/nest/modules/api/v1/excel-splitter/excel-splitter.service';


@Controller(`api/v1/excel-splitter`)
export class ExcelSplitterController {
    constructor (private readonly _service: ExcelSplitterService) {
    }

    @Post()
    @UseGuards(IsUserGuard)
    @UseInterceptors(FileInterceptor('file'))
    async split (@UploadedFile() file: Express.Multer.File) {
        return new StreamableFile(
            await this._service.split(file.buffer, 500, true),
            {
                type: 'application/zip',
            },
        );
    }
}