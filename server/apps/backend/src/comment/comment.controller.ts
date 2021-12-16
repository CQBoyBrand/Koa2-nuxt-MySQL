import {Body, Controller, HttpCode, Post, UseGuards} from '@nestjs/common';
import {CommentService} from './comment.service';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {CommentInterface} from '../comment/interface/comment.interface';
import {AuthGuard} from '@nestjs/passport';

@ApiTags('评论管理')
@Controller('comment')
export class CommentController {
    constructor(
       private readonly linkService: CommentService,
    ) {}

    @Post('getComment')
    @ApiOperation({
        summary: '获取评论列表',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getCommentsList(@Body() params): Promise<any> {
        const commentList = await this.linkService.getCommentsList(params);
        const commentCount = await this.linkService.getCommentsCount();

        const result = {
            list: commentList,
            total: commentCount,
        };

        return result;
    }

    @Post('checkComment')
    @ApiOperation({
        summary: '审核评论',
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('permissions'))
    @ApiBearerAuth()
    async editLink(@Body() params): Promise<CommentInterface> {
        const checkInfo = await this.linkService.updateComment(params);
        return checkInfo;
    }

    // @Post('deleteComment')
    // @ApiOperation({
    //     summary: '删除评论',
    // })
    // @HttpCode(200)
    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth()
    // async updateLinkStatus(@Body() params): Promise<CommentInterface> {
    //     const delInfo = await this.linkService.deleteLink(params);
    //     return delInfo;
    // }

}
