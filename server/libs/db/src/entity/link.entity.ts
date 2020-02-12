/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:42
 */

import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn({
        type: "int",
        comment: 'id'
    })
    id: number

    @Column({
        type: "text",
        comment: '网站名名',
        nullable: false
    })
    siteName: string

    @Column({
        type: "text",
        comment: '网站地址',
        nullable: false
    })
    siteUrl: string

    @Column({
        type: "int",
        comment: '链接状态, 1-可用，0-不可用',
        nullable: true,
        default: 0
    })
    status: number

    @Column({
        type: "bigint",
        comment: '创建时间',
        nullable: false,
        default: new Date().getTime()
    })
    cdate: number
}