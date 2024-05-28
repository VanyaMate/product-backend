import { TransformFnParams } from 'class-transformer';


export const transformStringToNumber = function (params: TransformFnParams) {
    return params.value ? parseInt(params.value) : params.value;
};