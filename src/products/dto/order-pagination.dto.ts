import { IsEnum, IsOptional } from 'class-validator';
import { paginationDto } from 'src/common';
import { OrderStatus } from 'src/orders/enum/order.enum';

export class orderPaginationDto extends paginationDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
