import { Module } from '@nestjs/common';
import { QiniuService } from './qiniu.service';

@Module({
  providers: [QiniuService],
})
export class QiniuModule {}
