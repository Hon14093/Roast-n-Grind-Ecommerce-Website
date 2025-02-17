const { PrismaClient } = require('@prisma/client');

class PaymentMethodService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPaymentMethod(data) {
    return await this.prisma.payment_Method.create({ data });
  }

  async getPaymentMethodById(method_id) {
    return await this.prisma.payment_Method.findUnique({
      where: { method_id },
    });
  }

  async getAllPaymentMethods() {
    return await this.prisma.payment_Method.findMany();
  }

  async updatePaymentMethod(method_id, data) {
    return await this.prisma.payment_Method.update({
      where: { method_id },
      data,
    });
  }

  async deletePaymentMethod(method_id) {
    return await this.prisma.payment_Method.delete({
      where: { method_id },
    });
  }
}

module.exports = new PaymentMethodService();
