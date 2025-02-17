const { PrismaClient } = require('@prisma/client');

class ProductFlavourService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createProductFlavour(data) {
    return await this.prisma.product_Flavour.create({ data });
  }

  async getProductFlavour(product_id, flavour_id) {
    return await this.prisma.product_Flavour.findUnique({
      where: { product_id_flavour_id: { product_id, flavour_id } },
      include: { Flavour_Note: true, Product: true },
    });
  }

  async getAllProductFlavours() {
    return await this.prisma.product_Flavour.findMany({
      include: { Flavour_Note: true, Product: true },
    });
  }

  async deleteProductFlavour(product_id, flavour_id) {
    return await this.prisma.product_Flavour.delete({
      where: { product_id_flavour_id: { product_id, flavour_id } },
    });
  }
}

module.exports = new ProductFlavourService();

