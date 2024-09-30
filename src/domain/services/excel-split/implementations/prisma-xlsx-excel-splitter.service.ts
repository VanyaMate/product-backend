import {
    IExcelFileSplitService,
} from '@/domain/services/excel-split/excel-splitter-service.interface';
import {
    DomainExcelFileData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileData';
import {
    DomainExcelFileSplitData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitData';
import {
    IFilesUploadService,
} from '@/domain/services/files-upload/files-upload-service.interface';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import {
    DomainNotificationFileUploadedData,
} from 'product-types/dist/notification/notification-data-types/file/DomainNotificationFileUploadedData';
import { IFileService } from '@/domain/services/file/file-service.interface';
import {
    DomainExcelFileSheetData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSheetData';
import * as AdmZip from 'adm-zip';
import { first } from 'rxjs';
import {
    DomainExcelFileSplitResponse,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitResponse';


export class PrismaXlsxExcelSplitterService implements IExcelFileSplitService {
    constructor (
        private readonly _fileUploadService: IFilesUploadService,
        private readonly _fileManager: IFileService,
        private readonly _prisma: PrismaClient,
    ) {
    }

    async upload (userId: string, fileName: string, fileType: string, fileSize: number, fileBuffer: Buffer): Promise<DomainExcelFileData> {
        // Очищаю прошлый файл
        await this.clear(userId);

        // Читаю файл
        const xlsxFile = XLSX.read(fileBuffer, { type: 'buffer' });

        // Создаю данные для возврата
        const data: DomainExcelFileData = {
            sheets   : {},
            responses: [],
        };

        // Прохожу по всем таблицам
        let workbook;
        xlsxFile.SheetNames.forEach((sheetName) => {
            workbook = XLSX.utils.sheet_to_json(xlsxFile.Sheets[sheetName], { header: 1 });

            // Записываю данные
            data.sheets[sheetName] = {
                firstRow  : workbook[0],
                rowsAmount: workbook.length,
            };
        });

        // Записываю файл
        const { 0: active } = await this._fileUploadService.save(userId, fileName, fileType, fileSize, fileBuffer);
        const uploadData    = active[2] as DomainNotificationFileUploadedData;
        await this._prisma.excelSplitFile.create({
            data: {
                meta  : JSON.stringify(data),
                userId: userId,
                fileId: uploadData.file.id,
            },
        });

        return data;
    }

    async getMy (userId: string): Promise<DomainExcelFileData> {
        return this._getUserExcelFile(userId);
    }

    async split (userId: string, splitData: DomainExcelFileSplitData): Promise<DomainExcelFileSplitResponse> {
        const excelSplitFile = await this._prisma.excelSplitFile.findFirst({
            where  : { userId },
            include: {
                file: {
                    select: {
                        filePath        : true,
                        fileOriginalName: true,
                    },
                },
            },
        });

        const xlsxFileBuffer = await this._fileManager.getFileBuffer(excelSplitFile.file.filePath);
        const xlsxFile       = XLSX.read(xlsxFileBuffer, { type: 'buffer' });
        const sheet          = xlsxFile.Sheets[splitData.selectedSheet];
        const meta           = JSON.parse(excelSplitFile.meta);

        if (sheet) {
            const sheetMeta: DomainExcelFileSheetData = meta['sheets']?.[splitData.selectedSheet];

            if (sheetMeta) {
                const data           = XLSX.utils.sheet_to_json(sheet);
                const { rowsAmount } = sheetMeta;
                const {
                          selectedColumns,
                          selectedSheet,
                          rowsPerFile,
                      }              = splitData;
                const zip            = new AdmZip();

                for (
                    let start = 0,
                        workbook: XLSX.WorkBook,
                        sheet: XLSX.WorkSheet,
                        file: any,
                        content: Array<any>,
                        contentItem: object,
                        end   = rowsPerFile;
                    start < rowsAmount;
                    start += rowsPerFile, end += rowsPerFile
                ) {
                    content  = data
                        .slice(start, end)
                        .map((row) => {
                            contentItem = {};
                            selectedColumns.forEach((key) => contentItem[key] = row[key]);
                            return contentItem;
                        });
                    workbook = XLSX.utils.book_new();
                    sheet    = XLSX.utils.json_to_sheet(content);
                    XLSX.utils.book_append_sheet(workbook, sheet, selectedSheet);
                    file = XLSX.write(workbook, {
                        type    : 'buffer',
                        bookType: 'xlsx',
                    });
                    zip.addFile(`${ start }-${ end }.xlsx`, file);
                }

                const buffer        = zip.toBuffer();
                const { 0: active } = await this._fileUploadService.save(
                    userId,
                    `${ excelSplitFile.file.fileOriginalName }-split.zip`,
                    `application/zip`,
                    Buffer.byteLength(buffer),
                    buffer,
                );
                const uploadData    = active[2] as DomainNotificationFileUploadedData;
                await this._prisma.excelSplitResponse.create({
                    data: {
                        rowsPerFile,
                        selectedSheet,
                        selectedColumns,
                        fileId     : uploadData.file.id,
                        splitFileId: excelSplitFile.id,
                    },
                });

                return {
                    options: splitData,
                    path   : uploadData.file.filePath,
                };
            }

            throw new Error(`Sheet "${ splitData.selectedSheet }" not valid. Try delete and upload again`);
        }

        throw new Error(`Sheet "${ splitData.selectedSheet }" not exist in current workbook`);
    }

    async clear (userId: string): Promise<boolean> {
        const file = await this._prisma.excelSplitFile.findFirst({
            where  : { userId },
            include: {
                responses: {
                    select: {
                        file: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });

        if (file) {
            await this._fileUploadService.remove(userId, file.fileId);
            await Promise.all(file.responses.map((response) =>
                    this._fileUploadService.remove(userId, response.file.id),
                ),
            );
        }

        return true;
    }

    private async _getUserExcelFile (userId: string): Promise<DomainExcelFileData> {
        const file = await this._prisma.excelSplitFile.findFirst({
            where  : { userId },
            include: {
                file     : true,
                responses: {
                    include: {
                        file: {
                            select: {
                                filePath: true,
                            },
                        },
                    },
                },
            },
        });

        if (file) {
            return {
                ...JSON.parse(file.meta),
                responses: file.responses.map((response) => ({
                    options: {
                        rowsPerFile    : response.rowsPerFile,
                        selectedSheet  : response.selectedSheet,
                        selectedColumns: response.selectedColumns,
                    },
                    path   : response.file.filePath,
                })),
            };
        }

        return null;
    }
}