export interface IFilesService {
    saveTo<FileType> (filePath: string, file: FileType): Promise<string>;

    remove (fileFullPath: string): Promise<boolean>;
}