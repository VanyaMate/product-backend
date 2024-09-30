export interface IFileService {
    saveTo (filePath: string, fileName: string, fileBuffer: Buffer): Promise<string>;

    getFileBuffer (filePath: string): Promise<Buffer>;

    remove (fileFullPath: string): Promise<boolean>;
}