/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/7 11:57
 */

import {ApiProperty} from "@nestjs/swagger";

/**
 * 登录-用户
 */
export class UserLoginDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string
}

/**
 * 创建-用户
 */
export class UserRegisterDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string

    @ApiProperty()
    confirmPassword: string
}

/**
 * 获取用户信息
 */
export class UserGetDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    signature: string;
}
/**
 * 获取用户信息
 */
export class UserUpdateDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    signature: string;
}


