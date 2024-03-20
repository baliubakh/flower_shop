import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  findOne(id: number) {
    if (!id) return null;
    return this.prisma.user.findUnique({ where: { id } });
  }

  find(email: string) {
    return this.prisma.user.findMany({ where: { email } });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');

    return this.prisma.user.delete({ where: { id } });
  }
}
