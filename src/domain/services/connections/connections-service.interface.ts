export interface IConnectionsService<ConnectionRequest, ConnectionResponse> {
    add (userId: string, request: ConnectionRequest, response: ConnectionResponse): void;

    remove (userId: string, request: ConnectionRequest): void;

    getAllByUserId (userId: string): ConnectionResponse[];
}