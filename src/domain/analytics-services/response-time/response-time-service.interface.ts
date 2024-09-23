export interface IResponseTimeService {
    save (url: string, responseTime: number): Promise<void>;
}