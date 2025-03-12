import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllProducts = async () => {
    return await prisma.product.findMany();
}

// working
export const getAllProductsDetails = async () => {
    return await prisma.product.findMany({
        select: {
            product_id: true,
            product_name: true,
            description: true,
            image_url: true,
            aroma_id: true,
            roast_id: true,
            type_id: true,
            Roast_Level: {
                select: {
                    roast_lvl: true,
                }
            },
            Product_Type: {
                select: {
                    type_name: true,
                }
            },
            Aroma: {
                select: {
                    aroma_name: true,
                }
            },
        },
        orderBy: {
            product_name: 'asc',
        },
    });
}

// used in shop page
export const getDetailedVariations = async () => {
    return await prisma.product.findMany({
        include: {
            Roast_Level: {
                select: {
                    roast_lvl: true,
                }
            },
            Product_Type: {
                select: {
                    type_name: true,
                }
            },
            Aroma: {
                select: {
                    aroma_name: true,
                }
            },
            Product_Weight: {
                select: {
                    pw_id: true,
                    product_price: true,
                    qty_in_stock: true,
                    Weight_Option: true
                }
            },
        },
        orderBy: {
            product_name: 'asc',
        },
    });
};


// id: 76aaf7d5-7701-42bd-9744-3938ec989be8
// const temp_data = {
//     product_id: '76aaf7d5-7701-42bd-9744-3938ec989be8',
//     product_name: 'Caramel Macchiato',
//     description: 'A sweet and creamy caramel coffee drink',
//     roast_id: 2,
// }

export const updateProduct = async (product_id, data) => {
    return await prisma.product.update({
        where: { product_id },
        data,
    });
}

export const getProductByID = async (product_id) => {
    return await prisma.product.findUnique({
        where: { product_id },
    });
}

export const createProduct = async (data) => {
    return await prisma.product.create({ data });
}

export const deleteProduct = async (product_id) => {
    return await prisma.product.delete({
        where: { product_id },
    });
}