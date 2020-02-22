import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('comment')
export class CommentController {
    constructor(
       private readonly commentService: CommentService
    ) {}

    @Post('addComment')
    @ApiOperation({
        summary: '添加文章评论'
    })
    @HttpCode(200)
    async addComment(@Body() params): Promise<any> {
        const addComment = await this.commentService.addComment(params)
        return addComment
    }

    @Post('addReplyComment')
    @ApiOperation({
        summary: '回复文章评论'
    })
    @HttpCode(200)
    async addReplyComment(@Body() params): Promise<any> {
        const addComment = await this.commentService.replyComment(params)
        return addComment
    }

    @Post('getComment')
    @ApiOperation({
        summary: '获取文章评论列表'
    })
    @HttpCode(200)
    async getComment(@Body() params): Promise<any> {
        const commentList = await this.commentService.getComment(params)
        return commentList
    }
}
