import { Module } from '@nestjs/common';
import { SiteConfigController } from './site-config.controller';
import { SiteConfigService } from './site-config.service';

@Module({
  controllers: [SiteConfigController],
  providers: [SiteConfigService]
})
export class SiteConfigModule {}
