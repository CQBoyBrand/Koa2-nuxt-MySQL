import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "@common/common/filters/http-exception.filter";
import {TransformInterceptor} from "@common/common/interface/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    // cors: {
    //     "origin": ['http://www.brandhuang.com','https://www.brandhuang.com','http://admin.brandhuang.com','https://admin.brandhuang.com'],
    //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     "preflightContinue": false,
    //     "optionsSuccessStatus": 204
    // }
      cors: true,
  });

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
  );
  console.log('process==', process.env)
  await app.listen(process.env.ADMIN_PORT);
  console.log(`backend service is running at http://localhost:${process.env.ADMIN_PORT}`)
}
bootstrap();
