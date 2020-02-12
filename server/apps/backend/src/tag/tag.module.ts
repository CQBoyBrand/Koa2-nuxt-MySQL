import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import {TagController} from "./tag.controller";

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
