import { TypeGuard } from 'product-types/dist/_helpers/types/guard.types';


export type Error = {
    message: string;
}

export const isError: TypeGuard<Error> = function (data: unknown): data is Error {
    return typeof data === 'object' && typeof data['message'] === 'string';
};