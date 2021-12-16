import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {CategoryService} from './category.service';

@ApiTags('分类')
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Post('addCategory')
    @ApiOperation({
        summary: '添加分类',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async addCategory(@Body() params): Promise<any> {
        const newCategory = await this.categoryService.addCategory(params);
        return newCategory;
    }

    @Post('getCategory')
    @ApiOperation({
        summary: '获取分类列表',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getCategory(@Body() params): Promise<any> {
        const cateList = await this.categoryService.getCategoryList(params);
        const cateCount = await this.categoryService.getCategoryCount();

        const result = {
            list: cateList,
            total: cateCount,
        };

        return result;
    }

    @Post('getAllCategory')
    @ApiOperation({
        summary: '获取所有分类',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAllCategory(@Body() params): Promise<any> {
        const allCategory = await this.categoryService.getAllCategory(params);
        return allCategory;
    }

    @Post('editCategory')
    @ApiOperation({
        summary: '编辑分类',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async editCategory(@Body() params): Promise<any> {
        const editCate = await this.categoryService.editCategpry(params);

        return editCate;
    }

    @Post('delCategory')
    @ApiOperation({
        summary: '删除分类',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async delCategory(@Body() params): Promise<any> {
        const delCate = await this.categoryService.delCategory(params);

        return delCate;
    }

}
