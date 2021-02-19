import { Document } from 'mongoose';
export declare type MagicUrlDocument = MagicUrl & Document;
export declare class MagicUrl {
    type: string;
    data: string;
    selfDestructTimer: number;
    createdAt: number;
    expiryTime: number;
    uniqueId: string;
    views: number;
    createdBy: string;
}
export declare const MagicUrlSchema: import("mongoose").Schema<Document<MagicUrl>, import("mongoose").Model<Document<MagicUrl>>, undefined>;
