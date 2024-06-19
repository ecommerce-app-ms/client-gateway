import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { NAST_SERVICE, ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { paginationDto } from 'src/common/index';
import { CreateOrderDto, StatusDto } from './dto';
import { orderPaginationDto } from 'src/products/dto/order-pagination.dto';
import { query } from 'express';
import { AuthGuard } from 'src/auth/guards';
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NAST_SERVICE) private readonly nastClient: ClientProxy, //@Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.nastClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  async findAll(@Query() OrderPaginationDto: orderPaginationDto) {
    return await this.nastClient.send('findAllOrders', OrderPaginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.nastClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: paginationDto,
  ) {
    return await this.nastClient
      .send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeStatus: StatusDto,
  ) {
    return await this.nastClient
      .send('changeOrderStatus', { id, status: changeStatus.status })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
