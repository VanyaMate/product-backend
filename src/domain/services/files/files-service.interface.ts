export interface IFilesService {
    saveTo (filePath: string, file: File): Promise<string>;
}