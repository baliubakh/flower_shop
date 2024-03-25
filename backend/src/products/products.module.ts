import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [ProductsController],
  imports: [S3Module],
  providers: [PrismaService, S3Service, ProductsService],
})
export class ProductsModule {}
