import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export const getCartDetailsById = async (cd_id) => {
    return await prisma.cart_Details.findUnique({
        where: { cd_id }
    });
};

export const deleteCartDetailByCartIdAndPwId = async (cart_id, pw_id) => {
    return await prisma.cart_Details.delete({
        where: {
            cart_id_pw_id: {
                cart_id: cart_id,
                pw_id: pw_id,
            },
        }
    })
}

export const getCartDetailsByCartId = async (cart_id) => {
    console.log(cart_id)
    return await prisma.cart_Details.findMany({
        select: {
            cd_id: true,
            cart_id: true,
            quantity: true,
            pw_id: true,
            item_subtotal: true,
            is_ground: true,
            Product_Weight: {
                include: {
                    Product: true,
                    Weight_Option: true
                }
            }
        },
        where: { cart_id }
    });
};

export const deleteCartDetailsByCartId = async (cart_id) => {
    return await prisma.cart_Details.deleteMany({
        where: { cart_id }
    });
};

export const getAllCartDetails = async () => {
    return await prisma.cart_Details.findMany();
};

export const updateCartDetail = async (cd_id, data) => {
    return await prisma.cart_Details.update({
        where: { cd_id },
        data
    });
};


export const getCartDetailsByProductId = async (product_id) => {
    return await prisma.cart_Details.findMany({
        where: { product_id }
    });
};

export const getCartDetailsByCartIdAndProductId = async (cart_id, product_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id
        }
    });
};

export const getCartDetailsByCartIdAndProductIdAndWeightId = async (cart_id, product_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id,
            weight_id
        }
    });
};

export const getCartDetailsByCartIdAndProductIdAndFlavourId = async (cart_id, product_id, flavour_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id,
            flavour_id
        }
    });
};

export const getCartDetailsByCartIdAndProductIdAndFlavourIdAndWeightId = async (cart_id, product_id, flavour_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id,
            flavour_id,
            weight_id
        }
    });
};

export const getCartDetailsByCartIdAndFlavourId = async (cart_id, flavour_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            flavour_id
        }
    });
};

export const getCartDetailsByCartIdAndWeightId = async (cart_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            weight_id
        }
    });
};

export const getCartDetailsByCartIdAndFlavourIdAndWeightId = async (cart_id, flavour_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            flavour_id,
            weight_id
        }
    });
};

export const createCartDetail = async (data) => {
    console.log("Dữ liệu nhận được từ client:", data);
    try {
        const result = await prisma.cart_Details.createMany({ 
            data,
            skipDuplicates: true
        });
        console.log("Kết quả từ Prisma:", result);
        return result;
    } catch (error) {
        console.error("Lỗi khi tạo Cart_Details:", error);
        throw error; 
    }
};
