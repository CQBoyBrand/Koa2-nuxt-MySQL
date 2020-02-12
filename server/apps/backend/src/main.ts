import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HttpExceptionFilter} from "@common/common/filters/http-exception.filter";
import {TransformInterceptor} from "@common/common/interface/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: true
  });

  const options = new DocumentBuilder()
      .setTitle('重庆崽儿Brand-博客系统-管理端接口文档')
      .setDescription('重庆崽儿Brand-博客系统-管理端接口文档')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3001);
  console.log(`backend service is running at http://localhost:3001`)
}
bootstrap();
