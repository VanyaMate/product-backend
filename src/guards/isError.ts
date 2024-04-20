import { TypeGuard } from 'product-types';


export type Error = {
    message: string;
}

export const isError: TypeGuard<Error> = function (data: unknown): data is Error {
    return typeof data === 'object' && typeof data['message'] === 'string';
};