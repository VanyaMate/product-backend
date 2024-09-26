import { Injectable } from '@nestjs/common';
import {
    IExcelSplitterService,
} from '@/domain/services/excel-splitter/excel-splitter-service.interface';
import {
    XlsxExcelSplitterService,
} from '@/domain/services/excel-splitter/implementations/xlsx-excel-splitter.service';
import { IZipService } from '@/domain/services/zip/zip-service.interface';
import {
    AdmZipService,
} from '@/domain/services/zip/implementations/amd-zip/adm-zip.service';


@Injectable()
export class ExcelSplitterService {
    private readonly _service: IExcelSplitterService;
    private readonly _zipService: IZipService;

    constructor () {
        this._service    = new XlsxExcelSplitterService();
        this._zipService = new AdmZipService();
    }

    async split (file: Buffer, linesPerFile: number, saveFirstRow: boolean = true) {
        try {
            return this._zipService.zip(
                await this._service.split(file, linesPerFile, saveFirstRow),
                'xlsx',
            );
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}