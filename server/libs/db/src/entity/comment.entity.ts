/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/11 18:36
 * Description:
 */
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({
        type: "int",
        comment: 'id'
    })
    id: number
}