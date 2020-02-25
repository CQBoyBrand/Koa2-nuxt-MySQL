import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {SiteConfigService} from "./site-config.service";

@Controller('config')
export class SiteConfigController {
    constructor(
       private  readonly configService: SiteConfigService
    ) {}

    @Post('addConfig')
    @ApiOperation({
        summary: '新增网站配置'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async addConfig(@Body() params): Promise<any> {
        const addConfig = await this.configService.addConfig(params)
        return addConfig
    }

    @Post('getConfig')
    @ApiOperation({
        summary: '获取网站配置'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getConfig(): Promise<any> {
        const getConfig = await this.configService.getConfig() || null
        return getConfig
    }

    @Post('editConfig')
    @ApiOperation({
        summary: '编辑网站配置'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async editConfig(@Body() params): Promise<any> {
        const editConfig = await this.configService.editConfig(params)
        return editConfig
    }

}
