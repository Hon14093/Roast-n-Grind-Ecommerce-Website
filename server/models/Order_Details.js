const { PrismaClient } = require('@prisma/client');

class OrderDetailService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createOrderDetail(data) {
    return await this.prisma.orderDetail.create({ data });
  }

  async getOrderDetailById(id) {
    return await this.prisma.orderDetail.findUnique({
      where: { id },
    });
  }

  async getAllOrderDetails() {
    return await this.prisma.orderDetail.findMany();
  }

  async updateOrderDetail(id, data) {
    return await this.prisma.orderDetail.update({
      where: { id },
      data,
    });
  }

  async deleteOrderDetail(id) {
    return await this.prisma.orderDetail.delete({
      where: { id },
    });
  }
}

module.exports = new OrderDetailService();
