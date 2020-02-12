/**
 * 请求成功拦截器-统一封装返回数据的格式
 */

import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { Request } from 'express'
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const res = context.getArgs()[0].res
        return next.handle().pipe(
            map((result) => {
                const req: Request = context.switchToHttp().getRequest()
                const pagination = req.body
                if (pagination.currentPage && pagination.limit) {
                    let isPaging = {
                        data: result.list,
                        total: result.total,
                        currentPage: pagination.currentPage,
                        limit: pagination.limit,
                    }
                    return {
                        data: isPaging,
                        code: res.statusCode,
                        message: '操作成功',
                    };
                } else {
                    return {
                        data: result,
                        code: res.statusCode,
                        message: '操作成功',
                    };
                }

            }),
        );
    }
}
