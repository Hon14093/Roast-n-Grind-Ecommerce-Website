// updateStock.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateStock() {
    try {
        const updatedProduct = await prisma.product_Weight.update({
            where: { pw_id: '550e8400-e29b-41d4-a716-446655440001' },
            data: { qty_in_stock: 10 }, // Cập nhật số lượng tồn kho thành 10
        });
        console.log('Updated product:', updatedProduct);
    } catch (error) {
        console.error('Error updating stock:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateStock();