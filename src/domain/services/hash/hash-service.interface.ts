export interface IHashService {
    hash (data: string): Promise<string>;

    compare (hash: string, password: string): Promise<boolean>;
}