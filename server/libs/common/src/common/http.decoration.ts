/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/8 14:02
 */
import {HttpException, HttpStatus} from "@nestjs/common";

export class CustomException extends HttpException {
    constructor(errmsg: string,errcode?: number) {
        super({ errmsg, errcode }, HttpStatus.OK);
    }
}
