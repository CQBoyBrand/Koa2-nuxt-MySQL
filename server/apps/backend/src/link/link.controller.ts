import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {LinkService} from './link.service';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {LinkInterface} from './interface/link.interface';
import {AuthGuard} from '@nestjs/passport';
import {LinkCreateDto} from './dto/link.dto';

@ApiTags('友情链接')
@Controller('link')
export class LinkController {
    constructor(
       private readonly linkService: LinkService,
    ) {}

    @Post('addLink')
    @ApiOperation({
        summary: '添加友情链接',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async addLink(@Body() params: LinkCreateDto): Promise<any> {
        const addLink = await this.linkService.addLink(params);
        return addLink;
    }

    @Post('getLink')
    @ApiOperation({
        summary: '获取友情链接',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getLink(@Body() params): Promise<any> {
        const linkList = await this.linkService.getLinkList(params);
        const linkCount = await this.linkService.getLinkCount();

        const result = {
            list: linkList,
            total: linkCount,
        };

        return result;
    }

    @Post('editLink')
    @ApiOperation({
        summary: '编辑友情链接',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async editLink(@Body() params): Promise<LinkInterface> {
        const editInfo = await this.linkService.updateLink(params);
        return editInfo;
    }

    @Post('updateLinkStatus')
    @ApiOperation({
        summary: '删除友情链接',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async updateLinkStatus(@Body() params): Promise<LinkInterface> {
        const delInfo = await this.linkService.deleteLink(params);
        return delInfo;
    }

}
