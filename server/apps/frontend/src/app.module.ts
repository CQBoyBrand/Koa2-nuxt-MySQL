import { Module } from '@nestjs/common';
import {DbModule} from "@libs/db/db.module";
import {CommonModule} from "@common/common/common.module";
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { LinkModule } from './link/link.module';
import { SiteConfigModule } from './site-config/site-config.module';

@Module({
  imports: [
    DbModule,
    CommonModule,
    ArticleModule,
    TagModule,
    CategoryModule,
    CommentModule,
    LinkModule,
    SiteConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
