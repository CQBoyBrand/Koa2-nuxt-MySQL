import {Controller, HttpCode, Post} from '@nestjs/common';
import {TagService} from './tag.service';
import {ApiOperation} from '@nestjs/swagger';

@Controller('tag')
export class TagController {
    constructor(
        private readonly tagService: TagService,
    ) {}

    @Post('getFontTagList')
    @ApiOperation({
        summary: '获取标签列表',
    })
    @HttpCode(200)
    async getFontTagList(): Promise<any> {
        const tagList = await this.tagService.getAllTag();
        return tagList;
    }
}
