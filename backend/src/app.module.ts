import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthService } from './users/auth.service';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { CartsModule } from './carts/carts.module';
import { S3Module } from './s3/s3.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ProductsModule,
    CartsModule,
    S3Module,
  ],
  controllers: [AppController, UsersController, ProductsController],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    AuthService,
    ProductsService,
  ],
})
export class AppModule {}
