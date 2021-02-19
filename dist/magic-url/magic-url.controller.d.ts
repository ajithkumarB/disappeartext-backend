import { MagicUrlService } from './magic-url.service';
import { MagicUrlDto } from './dto/magicUrl.dto';
export declare class MagicUrlController {
    private magicUrlService;
    constructor(magicUrlService: MagicUrlService);
    createMagicUrl(req: any, magicUrlDto: MagicUrlDto, res: any): Promise<any>;
    findMagicUrlMessage(req: any, res: any): Promise<any>;
    findMagicUrlLink(req: any, res: any): Promise<any>;
    getMyOldData(req: any, res: any): Promise<any>;
}
