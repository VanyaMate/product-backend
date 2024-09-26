export interface IZipService {
    zip (files: Array<Buffer>, format: string): Promise<Buffer>;
}