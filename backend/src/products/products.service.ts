import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  findOneById(id: number, user_id?: number) {
    if (!id) return null;
    return this.prisma.product.findUnique({
      where: { id, user_id, is_active: true },
    });
  }

  findActive() {
    return this.prisma.product.findMany({
      where: { is_active: true },
      orderBy: { id: 'desc' },
    });
  }

  findByUser(user_id: number) {
    return this.prisma.product.findMany({
      where: { user_id },
      orderBy: { id: 'desc' },
    });
  }

  findAll() {
    return this.prisma.product.findMany({ orderBy: { id: 'desc' } });
  }

  async update(id: number, data: Partial<Product>) {
    const product = await this.findOneById(id);
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    const product = await this.findOneById(id);
    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.product.delete({ where: { id } });
  }
}
