/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/22 11:45
 * Description:
 */

import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Config {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
        comment: '网站是否开启留言： 1-开启；0-关闭',
        default: 1
    })
    discussStatus: number
}