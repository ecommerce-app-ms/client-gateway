import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { paginationDto } from 'src/common/index';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NAST_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { orderPaginationDto } from './dto/order-pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NAST_SERVICE) private readonly nastClient: ClientProxy) {}

  @Post()
  async createProducts(@Body() createProductDto: CreateProductDto) {
    const products = await this.nastClient
      .send({ cmd: 'create_product' }, createProductDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
    return products;
  }
  @Get()
  async findAllProducts(@Query() orderPaginationDto: orderPaginationDto) {
    const products = await this.nastClient
      .send({ cmd: 'find_all_products' }, orderPaginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
    return products;
  }
  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    const products = this.nastClient
      .send({ cmd: 'find_one_product' }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
    return products;
    /*try {
      const product = await firstValueFrom(
        this.productClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }*/
  }

  @Delete(':id')
  async sofDeleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.nastClient.emit({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
    //return product;
  }
  @Patch(':id')
  async updateproduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.nastClient
      .emit({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );

    // return product;
  }
}
