export interface IExcelSplitterService {
    split (file: Buffer, linesPerFile: number, saveFirstRow?: boolean): Promise<Array<Buffer>>;
}