import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CartCreateInput) {
    return this.prisma.cart.create({ data });
  }

  findOne(id: number) {
    if (!id) return null;
    return this.prisma.cart.findUnique({
      where: { id, is_active: true },
    });
  }

  findByCustomer(customer_id: number) {
    if (!customer_id) return null;
    return this.prisma.cart.findUnique({
      where: { customer_id, is_active: true },
    });
  }

  async update(id: number, data: Prisma.CartUpdateInput) {
    const cart = await this.findOne(id);
    if (!cart) throw new NotFoundException('Cart not found');
    return this.prisma.cart.update({ where: { id }, data });
  }

  async remove(id: number) {
    const cart = await this.findOne(id);
    if (!cart) throw new NotFoundException('Cart not found');

    return this.prisma.cart.delete({ where: { id } });
  }
}
