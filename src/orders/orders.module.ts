import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE, envs } from 'src/config';
import { NastModule } from 'src/transports/nast.module';

@Module({
  imports: [
    NastModule,
    /*ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orders_microservices_host,
          port: envs.orders_microservices_port,
        },
      },
    ]),*/
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
