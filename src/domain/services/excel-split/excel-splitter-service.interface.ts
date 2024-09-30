import {
    DomainExcelFileData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileData';
import {
    DomainExcelFileSplitData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitData';
import {
    DomainExcelFileSplitResponse
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitResponse';


export interface IExcelFileSplitService {
    upload (userId: string, fileName: string, fileType: string, fileSize: number, fileBuffer: Buffer): Promise<DomainExcelFileData>;

    getMy (userId: string): Promise<DomainExcelFileData>;

    split (userId: string, splitData: DomainExcelFileSplitData): Promise<DomainExcelFileSplitResponse>;

    clear (userId: string): Promise<boolean>;
}