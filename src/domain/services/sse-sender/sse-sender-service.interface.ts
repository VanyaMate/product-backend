export interface ISseSenderService<Response> {
    send (response: Response, message: unknown): void;

    sendMany (response: Response, message: unknown[]): void;
}