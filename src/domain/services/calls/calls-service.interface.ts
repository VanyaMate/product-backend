import { DomainCall } from 'product-types/dist/call/DomainCall';


export interface ICallsService {
    getMyNotFinishedCalls (userId: string, cursor: string, limit: number): Promise<Array<DomainCall>>;

    getMyAllCalls (userId: string, cursor: string, limit: number): Promise<Array<DomainCall>>;

    getMyFinishedCalls (userId: string, cursor: string, limit: number): Promise<Array<DomainCall>>;

    getMyCallsWithUser (userId: string, withUserId: string, cursor: string, limit: number): Promise<Array<DomainCall>>;
}