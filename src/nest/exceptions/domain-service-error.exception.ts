import { HttpException } from '@nestjs/common';
import {
    DomainServiceResponseError
} from 'product-types/dist/error/DomainServiceResponseError';


export class DomainServiceErrorException extends HttpException {
    constructor (error: DomainServiceResponseError) {
        super(error, error.errors[0].code);
    }
}