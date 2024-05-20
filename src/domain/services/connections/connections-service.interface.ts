export interface IConnectionsService<ConnectionRequest, ConnectionResponse> {
    add (userId: string, request: ConnectionRequest, response: ConnectionResponse): Promise<ConnectionResponse>;

    remove (userId: string, request: ConnectionRequest): Promise<void>;

    getAllByUserId (userId: string): Promise<ConnectionResponse[]>;
}