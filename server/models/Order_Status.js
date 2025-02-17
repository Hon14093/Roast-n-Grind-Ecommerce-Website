const { PrismaClient } = require('@prisma/client');

class OrderStatusService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createOrderStatus(data) {
    return await this.prisma.orderStatus.create({ data });
  }

  async getOrderStatusById(status_id) {
    return await this.prisma.orderStatus.findUnique({
      where: { status_id },
    });
  }

  async getAllOrderStatuses() {
    return await this.prisma.orderStatus.findMany();
  }

  async updateOrderStatus(status_id, data) {
    return await this.prisma.orderStatus.update({
      where: { status_id },
      data,
    });
  }

  async deleteOrderStatus(status_id) {
    return await this.prisma.orderStatus.delete({
      where: { status_id },
    });
  }
}

module.exports = new OrderStatusService();
