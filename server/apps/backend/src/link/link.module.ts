import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import {LinkController} from "./link.controller";

@Module({
  imports: [],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule {}
