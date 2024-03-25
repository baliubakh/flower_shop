import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product, Role } from '@prisma/client';
import { UpdateProductDto } from './dtos/update-product.dto';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';

interface IFindUserParams {
  id: string;
}

@Controller('products')
export class ProductsController {
  private s3: S3Client;
  private region: string;

  constructor(
    private productService: ProductsService,
    private configService: ConfigService,
    private s3Service: S3Service,
  ) {
    this.region = this.configService.get<string>('S3_REGION');
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
      },
    });
  }

  @Roles(Role.admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('/')
  @UseInterceptors(FileInterceptor('photo'))
  async createProduct(
    @Request() req,
    @Body() body: CreateProductDto,

    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg)',
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1000 * 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<Product> {
    const key = uuidv4();
    const photo = await this.s3Service.uploadFile(file, key);

    const user_id = req.user['sub'];
    return this.productService.create({
      user: { connect: { id: user_id } },
      photo,
      ...body,
    });
  }

  @Roles(Role.admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
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
  @UseGuards(AccessTokenGuard, RolesGuard)
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

  @Roles(Role.admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete('/:id')
  async deleteUserProduct(@Param() params: IFindUserParams): Promise<Product> {
    const { id } = params;

    const product = await this.productService.findOneById(parseInt(id));
    if (product.photo) {
      const key = product.photo.split('/')[3];
      const bucket = this.configService.get<string>('S3_BUCKET_NAME');
      const input = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      try {
        await this.s3.send(input);
      } catch (err) {
        console.error(err);
      }
    }

    return this.productService.remove(parseInt(id));
  }
}
