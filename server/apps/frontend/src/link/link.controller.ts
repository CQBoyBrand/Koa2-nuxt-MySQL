import {Controller, HttpCode, Post} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {LinkService} from "./link.service";

@Controller('link')
export class LinkController {
    constructor(
        private readonly linkService: LinkService
    ) {
    }
    @Post('getlinkList')
    @ApiOperation({
        summary: '获取友链列表'
    })
    @HttpCode(200)
    async getlinkList(): Promise<any> {
        const linkList = await this.linkService.getLink()
        return linkList
    }
}
