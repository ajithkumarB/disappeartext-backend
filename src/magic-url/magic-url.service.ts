import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MagicUrlDocument } from 'src/schema/magic-url-schema';
import { MagicUrlDto } from './dto/magicUrl.dto';
var crypto = require('crypto')

@Injectable()
export class MagicUrlService {
    constructor(
        @InjectModel('MagicUrl') private readonly magicUrlModel: Model<MagicUrlDocument>
    ) { }
    async createMagicUrl(magicUrlDto: MagicUrlDto, createdBy: string) {
        const { type, data, selfDestructTimer } = magicUrlDto;
        const newMagicUrl = new this.magicUrlModel();
        newMagicUrl.createdBy = createdBy;
        newMagicUrl.type = type;
        newMagicUrl.data = data;
        newMagicUrl.selfDestructTimer = selfDestructTimer;
        const uniqueId = crypto.randomBytes(10).toString('hex');
        newMagicUrl.uniqueId = uniqueId;
        var createdAt = new Date().getTime() / 1000;
        newMagicUrl.createdAt = createdAt;
        newMagicUrl.expiryTime = createdAt + selfDestructTimer;
        await newMagicUrl.save();
        return uniqueId;
    }

    async findMagicUrl(uniqueId) {
        const magicUrl = await this.magicUrlModel.findOne({ uniqueId });
        if (magicUrl) {
            const currentTime = new Date().getTime() / 1000;
            if (magicUrl.expiryTime > currentTime) {
                magicUrl.views++;
                await magicUrl.save();
                return [true, magicUrl.data, magicUrl.expiryTime];
            }
            return [false];
        }
        else
            return [false];
    }

    async getMyOldData(email) {
        const messages = await this.magicUrlModel.find({ createdBy: email });
        return messages;
    }
}
