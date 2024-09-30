import {
    DomainExcelFileSplitData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitData';
import { IsBoolean, IsNumber, IsString } from 'class-validator';


export class ExcelSplitOptionsDto implements DomainExcelFileSplitData {
    @IsString()
    selectedSheet: string;

    @IsString({ each: true })
    selectedColumns: string[];

    @IsNumber()
    rowsPerFile: number;
}