import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Comment} from '@libs/db/entity/comment.entity';
import {Repository} from 'typeorm';
import {CustomException} from '@common/common/common/http.decoration';
import {FilterContent, setAvatar} from '@common/common/common/utils.common';
import {sendToAuthor, sendToObserver} from '@common/common/common/sendEmail';

@Injectable()
export class CommentService {
   constructor(
       @InjectRepository(Comment)
       private readonly commentRepo: Repository<Comment>,
   ) {}

   async addComment(params): Promise<any> {
       const newComment = new Comment();
       const cdate = new Date().getTime();
       const from_uavatar = setAvatar(params.email);
       newComment.artId = Number(FilterContent(params.artId));
       newComment.content = FilterContent(params.content);
       newComment.from_uname = FilterContent(params.nickname);
       newComment.from_uemail = FilterContent(params.email);
       newComment.from_uavatar = FilterContent(from_uavatar);
       newComment.from_uweb = FilterContent(params.webUrl);
       newComment.cdate = cdate;
       newComment.to_uname = null;
       newComment.to_uavatar = null;
       newComment.to_uemail = null;
       newComment.to_uweb = null;
       newComment.oldContent = null;
       newComment.oldCdate = null;
       newComment.artURL = params.articleURL;
       newComment.oldId = params.oldId;
       return await this.commentRepo.save(newComment).then(() => {
           const emailParams = {
               nickname: FilterContent(params.nickname),
               from_uavatar: FilterContent(from_uavatar),
               cdate,
               content: FilterContent(params.content),
               toURL: FilterContent(params.articleURL),
               subject: '',
           };
           if (newComment.artId === 0) {
               emailParams.subject = '有人在你的博客留言了，点击查看详情！';
           } else {
               emailParams.subject = '有人评论了你的文章，点击查看详情！';
           }
           sendToAuthor(emailParams);
           return 'success';
       }).catch((err) => {
           console.log(err);
           throw new CustomException('操作失败');
       });
   }

   async replyComment(params): Promise<any> {
       const newComment = new Comment();
       const cdate = new Date().getTime();
       const from_uavatar = setAvatar(params.email);
       newComment.artId = Number(FilterContent(params.artId));
       newComment.content = FilterContent(params.content);
       newComment.from_uname = FilterContent(params.nickname);
       newComment.from_uemail = FilterContent( params.email);
       newComment.from_uavatar = FilterContent(from_uavatar);
       newComment.from_uweb = FilterContent(params.webUrl);
       newComment.cdate = cdate;
       newComment.to_uname = FilterContent(params.touname);
       newComment.to_uavatar = FilterContent(params.touavatar);
       newComment.to_uemail = FilterContent(params.touemail);
       newComment.to_uweb = FilterContent(params.touweb);
       newComment.oldContent = FilterContent(params.oldContent);
       newComment.oldCdate = Number(FilterContent(params.oldCdate));
       newComment.artURL = params.articleURL;
       return await this.commentRepo.save(newComment).then(() => {
           const emailParams = {
               nickname: FilterContent(params.nickname),
               from_uavatar: FilterContent(from_uavatar),
               touemail: FilterContent(params.touemail),
               cdate,
               content: FilterContent(params.content),
               toURL: FilterContent(params.articleURL),
               subject: '博客留言回复提醒',
           };
           sendToAuthor(emailParams);
           return 'success';
       }).catch(() => {
           throw new CustomException('操作失败');
       });
   }

   async getComment(params): Promise<any> {
        const commentList = await this.commentRepo.query(`
            select id,
            content,
            cdate as timestamp,
            from_uname,
            from_uavatar,
            from_uweb,
            from_uemail,
            oldContent,
            to_uname,to_uavatar,to_uweb,to_uemail,
            FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i') as cdate ,
            FROM_UNIXTIME(oldCdate/1000,'%Y-%m-%d  %H:%i') as oldCdate
            from comment where artId = ${params.artId} and isChecked = 1
            ORDER BY cdate desc
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `);
        const  commentCount = await this.commentRepo.query(`
            select count(*) as total from comment where artId = ${params.artId} and isChecked = 1 ;
       `);
        const result = {
           list: commentList,
           total: Number(commentCount[0].total),
       };
        return result;
   }
}
