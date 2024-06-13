import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import { IsString } from 'class-validator';
import {
    DomainMessageUpdateData,
} from 'product-types/dist/message/DomainMessageUpdateData';


export class PrivateMessageUpdateDataDto implements DomainMessageUpdateData {
    @IsString()
    message: string;

    @IsString()
    messageType: DomainMessageType;
}