const { PrismaClient } = require('@prisma/client');

class DiscountService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createDiscount(data) {
    return await this.prisma.discount.create({ data });
  }

  async getDiscountById(discount_id) {
    return await this.prisma.discount.findUnique({
      where: { discount_id },
    });
  }

  async getAllDiscounts() {
    return await this.prisma.discount.findMany();
  }

  async updateDiscount(discount_id, data) {
    return await this.prisma.discount.update({
      where: { discount_id },
      data,
    });
  }

  async deleteDiscount(discount_id) {
    return await this.prisma.discount.delete({
      where: { discount_id },
    });
  }
}

module.exports = new DiscountService();
