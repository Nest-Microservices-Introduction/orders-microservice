import { Injectable, OnModuleInit, Logger, HttpStatus } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { ChangeOrderStatusDto, OrderPaginationDto } from './dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Base de datos conectado');
  }
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.order.create({ data: createOrderDto });

    return order;
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const totalPages = await this.order.count({
      where: { status: orderPaginationDto.status },
    });
    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;
    const orders = await this.order.findMany({
      where: { status: orderPaginationDto.status },
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });
    return {
      data: orders,
      meta: {
        totalPages: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    };
  }

  async findOne(id: string) {
    const orderBD = await this.order.findUnique({ where: { id: id } });

    if (!orderBD) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${id} not found`,
      });
    }
    return orderBD;
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) return order;

    const orderUpdated = await this.order.update({
      where: { id: id },
      data: { status: status },
    });

    return orderUpdated;
  }
}
