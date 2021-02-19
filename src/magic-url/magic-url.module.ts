import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MagicUrl, MagicUrlSchema } from 'src/schema/magic-url-schema';
import { MagicUrlController } from './magic-url.controller';
import { MagicUrlService } from './magic-url.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MagicUrl.name, schema: MagicUrlSchema }]),],
  controllers: [MagicUrlController],
  providers: [MagicUrlService]
})
export class MagicUrlModule { }
