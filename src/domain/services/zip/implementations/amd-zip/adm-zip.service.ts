import { IZipService } from '@/domain/services/zip/zip-service.interface';
import * as AdmZip from 'adm-zip';


export class AdmZipService implements IZipService {
    async zip (files: Array<Buffer>, format: string): Promise<Buffer> {
        const zip = new AdmZip();
        files.forEach((file, index) => zip.addFile(`file ${ index }.${ format }`, file));
        return zip.toBuffer();
    }
}