/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/10 21:03
 * Description:
 */
import {ApiProperty} from '@nestjs/swagger';

export class LinkCreateDto {
    @ApiProperty()
    siteName: string;
    @ApiProperty()
    siteUrl: string;
}
