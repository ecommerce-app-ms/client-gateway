import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, orderStatusList } from '../enum/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(orderStatusList, {
    message: ` valid status are ${orderStatusList} `,
  })
  status: OrderStatus;
}
