import { IHashService } from '@/domain/services/hash/hash-service.interface';
import * as bcrypt from 'bcrypt';


export class BcryptHashService implements IHashService {
    async hash (data: string): Promise<string> {
        return bcrypt.hash(data, 2);
    }

    async compare (hash: string, password: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}