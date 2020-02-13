import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {CategoryService} from "../category/category.service";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {TagService} from "./tag.service";

@ApiTags('标签')
@Controller('tag')
export class TagController {
    constructor(
        private readonly tagService: TagService
    ) {}

    @Post('addTag')
    @ApiOperation({
        summary: '添加标签'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async addCategory(@Body() params): Promise<any> {
        const newTag = await this.tagService.addTag(params)
        return newTag
    }

    @Post('getTag')
    @ApiOperation({
        summary: '获取标签列表'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getTag(@Body() params): Promise<any> {
        const tagList = await this.tagService.getTagList(params)
        const tagCount = await this.tagService.getTagCount()

        let result = {
            list: tagList,
            total: tagCount,
        }

        return result
    }

    @Post('getAllTag')
    @ApiOperation({
        summary: '获取所有标签'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAllTag(@Body() params): Promise<any> {
        const allTagList = await this.tagService.getAllTag(params)

        return allTagList
    }

    @Post('editTag')
    @ApiOperation({
        summary: '编辑标签'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async editCategory(@Body() params): Promise<any> {
        const editTag = await this.tagService.editTag(params)

        return editTag
    }

    @Post('delTag')
    @ApiOperation({
        summary: '删除标签'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async delCategory(@Body() params): Promise<any> {
        const delTag = await this.tagService.delTag(params)

        return delTag
    }
}
