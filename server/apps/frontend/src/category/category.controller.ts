import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {ArticleService} from "../article/article.service";
import {ApiOperation} from "@nestjs/swagger";
import {CategoryService} from "./category.service";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Post('getFontCategoryList')
    @ApiOperation({
        summary: '获取分类列表'
    })
    @HttpCode(200)
    async getFontCategoryList(): Promise<any> {
        const cateList = await this.categoryService.getCategoryList()
        return cateList
    }
}
