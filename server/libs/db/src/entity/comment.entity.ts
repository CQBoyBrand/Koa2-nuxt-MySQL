/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/11 18:36
 * Description:
 */
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'id',
    })
    id: number;

    @Column({
        type: 'bigint',
        comment: '文章id',
        nullable: false,
    })
    artId: number;

    @Column({
        type: 'text',
        comment: '评论的文章链接',
        nullable: false,
    })
    artURL: string;

    @Column({
        type: 'text',
        comment: '评论内容',
        nullable: false,
    })
    content: any;

    @Column({
        type: 'text',
        comment: '评论者昵称',
        nullable: false,
    })
    from_uname: string;

    @Column({
        type: 'text',
        comment: '评论者邮箱',
        nullable: false,
    })
    from_uemail: string;

    @Column({
        type: 'text',
        comment: '评论者头像',
        nullable: false,
    })
    from_uavatar: string;

    @Column({
        type: 'text',
        comment: '评论者网址',
        nullable: true,
    })
    from_uweb: string;

    @Column({
        type: 'bigint',
        comment: '评论回复时间',
        nullable: false,
    })
    cdate: number;

    @Column({
        type: 'text',
        comment: '被回复者昵称',
        nullable: true,
    })
    to_uname: string;

    @Column({
        type: 'text',
        comment: '被回复者头像',
        nullable: true,
    })
    to_uavatar: string;

    @Column({
        type: 'text',
        comment: '被回复者邮箱',
        nullable: true,
    })
    to_uemail: string;

    @Column({
        type: 'text',
        comment: '被回复者网址',
        nullable: true,
    })
    to_uweb: string;

    @Column({
        type: 'text',
        comment: '被回复的内容',
        nullable: true,
    })
    oldContent: string;

    @Column({
        type: 'bigint',
        comment: '被回复的内容的回复时间',
        nullable: true,
    })
    oldCdate: number;

    @Column({
        type: 'bigint',
        comment: '被回复内容的id',
        nullable: true,
    })
    oldId: number;

    @Column({
        type: 'int',
        comment: '评论是否审核过 1-通过；0-不通过',
        nullable: false,
        default: 0,
    })
    isChecked: number;
}
