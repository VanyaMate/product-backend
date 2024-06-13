import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import {
    DomainMessageCreateData,
} from 'product-types/dist/message/DomainMessageCreateData';
import { IsString } from 'class-validator';


export class PrivateMessageCreateDataDto implements DomainMessageCreateData {
    @IsString()
    message: string;

    @IsString()
    messageType: DomainMessageType;
}