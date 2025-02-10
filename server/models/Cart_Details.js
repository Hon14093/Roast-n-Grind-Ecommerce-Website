import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CartDetailsController {
    constructor() {
        this.prisma = prisma;
    }

    // Create a new Cart Detail
    async createCartDetail(data) {
        return await this.prisma.cart_Details.create({
            data: data,
        });
    }

    // Get all Cart Details
    async getAllCartDetails() {
        return await this.prisma.cart_Details.findMany();
    }

    // Get a Cart Detail by ID
    async getCartDetailById(cd_id) {
        return await this.prisma.cart_Details.findUnique({
            where: { cd_id: cd_id },
        });
    }

    // Get Cart Details by Cart ID
    async getCartDetailsByCartId(cart_id) {
        return await this.prisma.cart_Details.findMany({
            where: { cart_id: cart_id },
        });
    }

    // Update a Cart Detail
    async updateCartDetail(cd_id, data) {
        return await this.prisma.cart_Details.update({
            where: { cd_id: cd_id },
            data: data,
        });
    }

    // Delete a Cart Detail
    async deleteCartDetail(cd_id) {
        return await this.prisma.cart_Details.delete({
            where: { cd_id: cd_id },
        });
    }
}

export default new CartDetailsController();
