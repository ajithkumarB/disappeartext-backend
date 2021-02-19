import { Model } from 'mongoose';
import { MagicUrlDocument } from 'src/schema/magic-url-schema';
import { MagicUrlDto } from './dto/magicUrl.dto';
export declare class MagicUrlService {
    private readonly magicUrlModel;
    constructor(magicUrlModel: Model<MagicUrlDocument>);
    createMagicUrl(magicUrlDto: MagicUrlDto, createdBy: string): Promise<any>;
    findMagicUrl(uniqueId: any): Promise<(string | number | boolean)[]>;
    getMyOldData(email: any): Promise<MagicUrlDocument[]>;
}
