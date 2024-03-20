import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product, Role } from '@prisma/client';
import { UpdateProductDto } from './dtos/update-product.dto';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role';

interface IFindUserParams {
  id: string;
}

@UseGuards(AccessTokenGuard)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @Post('/')
  async createProduct(
    @Request() req,
    @Body() body: CreateProductDto,
  ): Promise<Product> {
    const user_id = req.user['sub'];
    return this.productService.create({
      user: { connect: { id: user_id } },
      ...body,
    });
  }

  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  async getProduct(
    @Request() req,
    @Param() params: IFindUserParams,
  ): Promise<Product> {
    const { id } = params;
    console.log(id);
    const user = req.user['sub'];
    return this.productService.findOneById(parseInt(id), user);
  }

  // @Get('/')
  // async getUsersProducts(@Request() req): Promise<Product[]> {
  //   const user = req.user['sub'];
  //   return this.productService.findByUser(user);
  // }

  @Get('/')
  async getActiveProducts(): Promise<Product[]> {
    return this.productService.findActive();
  }

  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @Patch('/:id')
  async updateUserProduct(
    @Request() req,
    @Param() params: IFindUserParams,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    const { id } = params;
    const user_id = req.user['sub'];
    return this.productService.update(parseInt(id), user_id, body);
  }

  @Delete('/:id')
  async deleteUserProduct(@Param() params: IFindUserParams): Promise<Product> {
    const { id } = params;

    return this.productService.remove(parseInt(id));
  }
}
