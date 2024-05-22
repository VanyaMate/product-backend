import {
    ISseSenderService,
} from '@/domain/services/sse-sender/sse-sender-service.interface';
import { Response } from 'express';


export class SseSenderService implements ISseSenderService<Response> {
    send (response: Response, message: unknown): void {
        response.write(this._convertToResponseFormat(message));
    }

    sendMany (response: Response, messages: unknown[]): void {
        const sseResponse: string[] = messages.map(this._convertToResponseFormat.bind(this));
        response.write(sseResponse.join(''));
    }

    private _convertToResponseFormat (message: unknown): string {
        if (typeof message === 'string') {
            return `data ${ message }\n\n`;
        } else {
            return `data ${ JSON.stringify(message) }\n\n`;
        }
    }
}