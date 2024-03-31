import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';
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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photos', maxCount: 10 }]))
  async createProduct(
    @Request() req,
    @Body() body: CreateProductDto,
    // new ParseFilePipeBuilder()
    //   .addFileTypeValidator({ fileType: /.(jpg|jpeg|png)$/ })
    //   .addMaxSizeValidator({
    //     maxSize: 5 * 1000 * 1000,
    //   })
    //   .build({
    //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    //   }),
    @UploadedFiles()
    files: { photos: Express.Multer.File[] },
  ): Promise<Product> {
    const photos = await Promise.all(
      files.photos.map(async (currPhoto) => {
        const key = `products/${uuidv4()}`;
        return await this.s3Service.uploadFile(currPhoto, key);
      }),
    );

    const user_id = req.user['sub'];
    return this.productService.create({
      user: { connect: { id: user_id } },
      photos,
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
  async getProduct(@Param() params: IFindUserParams): Promise<Product> {
    const { id } = params;
    return this.productService.findOneById(parseInt(id));
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
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch('/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'newPhotos', maxCount: 10 }]))
  async updateUserProduct(
    @Param() params: IFindUserParams,
    @Body() body: UpdateProductDto,
    @UploadedFiles()
    files: { newPhotos: Express.Multer.File[] },
  ): Promise<Product> {
    const { id } = params;
    const product = await this.productService.findOneById(parseInt(id));
    if (product && product.photos) {
      await Promise.all(
        product.photos
          .filter((el) => body.photos && !body.photos.includes(el))
          .map(async (currPhoto) => {
            console.log(currPhoto);
            const splitted = currPhoto.split('/')[4];
            await this.s3Service.deleteFile(`products/${splitted}`);
          }),
      );
    }
    const photos = await Promise.all(
      (files.newPhotos || []).map(async (currPhoto) => {
        const key = `products/${uuidv4()}`;
        return await this.s3Service.uploadFile(currPhoto, key);
      }),
    );

    return this.productService.update(parseInt(id), {
      ...body,
      photos: [...(body.photos || []), ...photos],
    });
  }

  @Roles(Role.admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete('/:id')
  async deleteUserProduct(@Param() params: IFindUserParams): Promise<Product> {
    const { id } = params;

    const product = await this.productService.findOneById(parseInt(id));
    if (product.photos) {
      await Promise.all(
        product.photos.map(async (currPhoto) => {
          const splitted = currPhoto.split('/')[4];
          await this.s3Service.deleteFile(`products/${splitted}`);
        }),
      );
    }

    return this.productService.remove(parseInt(id));
  }
}
