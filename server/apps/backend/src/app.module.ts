import { Module } from '@nestjs/common';
import {DbModule} from '@libs/db/db.module';
import { UsersModule } from './users/users.module';
import {CommonModule} from '@common/common/common.module';
import { LinkModule } from './link/link.module';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { TagController } from './tag/tag.controller';
import { TagModule } from './tag/tag.module';
import { ArticleService } from './article/article.service';
import { ArticleModule } from './article/article.module';
import { QiniuController } from './qiniu/qiniu.controller';
import { QiniuModule } from './qiniu/qiniu.module';
import { SiteConfigService } from './site-config/site-config.service';
import { SiteConfigController } from './site-config/site-config.controller';
import { SiteConfigModule } from './site-config/site-config.module';
import {CommentModule} from './comment/comment.module';

@Module({
  imports: [
      DbModule,
      CommonModule,
      UsersModule,
      LinkModule,
      CategoryModule,
      TagModule,
      ArticleModule,
      QiniuModule,
      SiteConfigModule,
      CommentModule,
  ],
  controllers: [QiniuController, SiteConfigController],
  providers: [SiteConfigService],
})
export class AppModule {}
