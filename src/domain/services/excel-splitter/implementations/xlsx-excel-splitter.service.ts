import {
    IExcelSplitterService,
} from '@/domain/services/excel-splitter/excel-splitter-service.interface';
import * as XLSX from 'xlsx';


export class XlsxExcelSplitterService implements IExcelSplitterService {
    async split (file: Buffer, linesPerFile: number, saveFirstRow?: boolean): Promise<Array<Buffer>> {
        const xlsxFile                  = XLSX.read(file, { type: 'buffer' });
        const splitFiles: Array<Buffer> = [];
        const data                      = XLSX.utils.sheet_to_json(xlsxFile.Sheets[xlsxFile.SheetNames[0]]);
        const header                    = saveFirstRow ? data.splice(0, 1)
                                                       : null;

        let row;
        let book;

        console.log('Data length', data.length);

        for (let i = 0; data.length > 0; i++) {
            if (saveFirstRow) {
                row = [ header, ...data.splice(0, linesPerFile) ];
            } else {
                row = data.splice(0, linesPerFile);
            }

            console.log('Row', i, row.length);

            book = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(row), `part ${ i }`);
            splitFiles.push(XLSX.write(book, {
                type    : 'buffer',
                bookType: 'xlsx',
            }));
        }

        console.log('split files count', splitFiles.length);

        return splitFiles;
    }
}