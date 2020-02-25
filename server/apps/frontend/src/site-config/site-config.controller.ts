import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import {SiteConfigService} from "./site-config.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('config')
export class SiteConfigController {
    constructor(
        private readonly configService: SiteConfigService
    ) {}

    @Get('getSiteConfig')
    @ApiOperation({
        summary: '获取友链列表'
    })
    @HttpCode(200)
    async getSiteConfig(): Promise<any> {
        const siteConfig = await this.configService.getConfig()
        return siteConfig
    }
}
