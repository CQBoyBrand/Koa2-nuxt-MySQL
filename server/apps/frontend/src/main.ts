import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {TransformInterceptor} from "@common/common/interface/transform.interceptor";
import {HttpExceptionFilter} from "@common/common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(process.env.APP_PORT);
  console.log(`frontend service is running at http://localhost:${process.env.APP_PORT}`)
}
bootstrap();
