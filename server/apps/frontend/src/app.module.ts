import { Module } from '@nestjs/common';
import {DbModule} from "@libs/db/db.module";
import {CommonModule} from "@common/common/common.module";

@Module({
  imports: [
    DbModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
