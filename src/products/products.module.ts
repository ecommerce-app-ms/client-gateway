import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NAST_SERVICE, PRODUCT_SERVICE, envs } from 'src/config';
import { NastModule } from 'src/transports/nast.module';

@Module({
  imports: [
    NastModule,
    /*ClientsModule.register([
      {
        name: NAST_SERVICE, //PRODUCT_SERVICE,
        transport: Transport.NATS, //TCP,
        options: {
          // host: envs.products_microservices_host,
          // port: envs.products_microservices_port,
          servers: envs.nast_servers,
        },
      },
    ]),*/
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
