import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { AllowAny } from '../decorators/allow-any';
import { ProductsService } from 'src/products/products.service';

@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @AllowAny()
  async create(@Request() req, @Body() createCartDto: CreateCartDto) {
    const user_id = req.user['sub'];

    if (user_id && (await this.cartsService.findByCustomer(user_id)))
      throw new BadRequestException();

    return await this.cartsService.create({
      ...(user_id && { customer: { connect: { id: user_id } } }),
      ...createCartDto,
    });
  }

  @Post('full')
  async getFullCart(@Body() body: CreateCartDto) {
    const { cartObj } = body;
    if (!cartObj) throw new BadRequestException('Cart is empty');
    const cart: { [key: string]: number } = JSON.parse(cartObj);
    const fullCart = Promise.all(
      Object.entries(cart).map(async (el) => {
        return {
          ...(await this.productsService.findOneById(+el[0])),
          amount: el[1],
        };
      }),
    );
    return fullCart;
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async findOne(@Request() req) {
    const user_id = req.user['sub'];

    const cart = await this.cartsService.findByCustomer(+user_id);
    if (!cart) throw new NotFoundException('Cart Not Found');
    return cart;
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async findByUser(@Request() req) {
    return this.cartsService.findByCustomer(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  async update(@Request() req, @Body() updateCartDto: UpdateCartDto) {
    const user_id = req.user['sub'];

    const cart = await this.cartsService.findByCustomer(+user_id);

    if (user_id && cart.customer_id !== user_id) throw new ForbiddenException();
    return this.cartsService.update(+cart.id, updateCartDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @AllowAny()
  async remove(@Request() req, @Param('id') id: string) {
    const user_id = req.user['sub'];
    const cart = await this.cartsService.findOne(+id);

    if (
      (user_id && cart.customer_id !== user_id) ||
      (!user_id && cart.customer_id)
    )
      throw new ForbiddenException();
    return this.cartsService.update(+id, { is_active: false });
  }
}
