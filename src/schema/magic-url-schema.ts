import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type MagicUrlDocument = MagicUrl & Document;

@Schema()
export class MagicUrl {
    @Prop({ required: true, enum: ['message', 'link'] })
    type: string;

    @Prop({ required: true })
    data: string;

    @Prop({ required: true })
    selfDestructTimer: number;

    @Prop()
    createdAt: number;

    @Prop()
    expiryTime: number;

    @Prop()
    uniqueId: string;

    @Prop({ default: 0 })
    views: number;

    @Prop()
    createdBy: string;
}

export const MagicUrlSchema = SchemaFactory.createForClass(MagicUrl);
