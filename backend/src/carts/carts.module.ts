import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from '../prisma.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [CartsController],
  providers: [PrismaService, ProductsService, CartsService],
})
export class CartsModule {}
