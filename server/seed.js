// server/seed.js
import prisma from './prisma/prisma.js';

async function seed() {
    try {
        // 1. Thêm Account
        const account = await prisma.account.upsert({
            where: { account_id: '550e8400-e29b-41d4-a716-446655440000' },
            update: {},
            create: {
                account_id: '550e8400-e29b-41d4-a716-446655440000',
                account_name: 'Test User',
                email: 'test@example.com',
                phone: '0123456789',
                password: 'hashedpassword',
                is_admin: false,
            },
        });

        // 2. Thêm Roast_Level
        let roastLevel = await prisma.roast_Level.findFirst({
            where: { roast_lvl: 'Medium' },
        });
        if (!roastLevel) {
            roastLevel = await prisma.roast_Level.create({
                data: {
                    roast_lvl: 'Medium',
                },
            });
        }

        // 3. Thêm Product_Type
        let productType = await prisma.product_Type.findFirst({
            where: { type_name: 'Coffee' },
        });
        if (!productType) {
            productType = await prisma.product_Type.create({
                data: {
                    type_name: 'Coffee',
                },
            });
        }

        // 4. Thêm Aroma
        let aroma = await prisma.aroma.findFirst({
            where: { aroma_name: 'Nutty' },
        });
        if (!aroma) {
            aroma = await prisma.aroma.create({
                data: {
                    aroma_name: 'Nutty',
                },
            });
        }

        // 5. Thêm Product
        const product = await prisma.product.upsert({
            where: { product_id: '550e8400-e29b-41d4-a716-446655440002' },
            update: {},
            create: {
                product_id: '550e8400-e29b-41d4-a716-446655440002',
                product_name: 'Test Coffee',
                image_url: 'http://example.com/coffee.jpg',
                roast_id: roastLevel.roast_id,
                type_id: productType.type_id,
                aroma_id: aroma.aroma_id,
            },
        });

        // 6. Thêm Weight_Option
        let weightOption = await prisma.weight_Option.findFirst({
            where: { weight_name: '250g' },
        });
        if (!weightOption) {
            weightOption = await prisma.weight_Option.create({
                data: {
                    weight_name: '250g',
                },
            });
        }

        // 7. Thêm Product_Weight
        const productWeight = await prisma.product_Weight.upsert({
            where: { pw_id: '550e8400-e29b-41d4-a716-446655440001' },
            update: {},
            create: {
                pw_id: '550e8400-e29b-41d4-a716-446655440001',
                product_price: 100000,
                qty_in_stock: 10,
                weight_id: weightOption.weight_id,
                product_id: product.product_id,
            },
        });

        // 8. Thêm City
        let city = await prisma.city.findFirst({
            where: { city_name: 'Hanoi' },
        });
        if (!city) {
            city = await prisma.city.create({
                data: {
                    city_name: 'Hanoi',
                },
            });
        };

        const shippingMethodNormal = await prisma.shipping_Method.upsert({
            where: { shipping_id: 1 },
            update: {},
            create: {
                shipping_id: 1,
                shipping_method: 'Bình thường',
                shipping_price: 20000,
            },
        });
        const shippingMethodExpress = await prisma.shipping_Method.upsert({
            where: { shipping_id: 2 },
            update: {},
            create: {
                shipping_id: 2,
                shipping_method: 'Hỏa tốc',
                shipping_price: 40000,
            },
        });
        // 9. Thêm Address (địa chỉ cũ)
        const address1 = await prisma.address.upsert({
            where: { address_id: '5ffab2d4-dcc3-46db-9a4b-70a96203050c' },
            update: {},
            create: {
                address_id: '5ffab2d4-dcc3-46db-9a4b-70a96203050c',
                address_line: '123 Test Street',
                ward: 'Ward 1',
                district: 'District 1',
                city_id: city.city_id,
                first_name: 'Test',
                last_name: 'User',
                postal_code: '10000',
            },
        });

        // 10. Thêm User_Address (địa chỉ cũ)
        const userAddress1 = await prisma.user_Address.upsert({
            where: { ua_id: '550e8400-e29b-41d4-a716-446655440003' },
            update: {},
            create: {
                ua_id: '550e8400-e29b-41d4-a716-446655440003',
                account_id: account.account_id,
                address_id: address1.address_id,
            },
        });

        // 11. Thêm Address mới (địa chỉ từ log)
        const address2 = await prisma.address.upsert({
            where: { address_id: '6dec34e2-d8f3-45a5-baf3-036643829359' },
            update: {},
            create: {
                address_id: '6dec34e2-d8f3-45a5-baf3-036643829359',
                address_line: '618, 17. Nguyễn Văn Linh',
                ward: 'Khánh Mỹ',
                district: 'Khánh Hòa, Châu Phú',
                city_id: 1, // Dùng city_id từ file CSV
                first_name: 'La Phin',
                last_name: 'Ha',
                postal_code: '100011',
            },
        });

        // 12. Thêm User_Address mới
        const userAddress2 = await prisma.user_Address.upsert({
            where: { ua_id: '6dec34e2-d8f3-45a5-baf3-036643829360' },
            update: {},
            create: {
                ua_id: '6dec34e2-d8f3-45a5-baf3-036643829360',
                account_id: account.account_id,
                address_id: address2.address_id,
            },
        });

        // 13. Thêm Shipping_Method
        const shippingMethod = await prisma.shipping_Method.upsert({
            where: { shipping_id: 1 },
            update: {},
            create: {
                shipping_method: 'Standard Shipping',
                shipping_price: 30000,
            },
        });

        // 14. Thêm Order_Status
        const orderStatus = await prisma.order_Status.upsert({
            where: { status_id: 1 },
            update: {},
            create: {
                status_name: 'Pending',
            },
        });

        // 15. Thêm Shopping_Cart
        const cart = await prisma.shopping_Cart.upsert({
            where: { account_id: account.account_id },
            update: {},
            create: {
                account_id: account.account_id,
            },
        });

        // 16. Thêm Cart_Details
        await prisma.cart_Details.upsert({
            where: {
                cart_id_pw_id: {
                    cart_id: cart.cart_id,
                    pw_id: productWeight.pw_id,
                },
            },
            update: {
                quantity: 2,
                item_subtotal: 200000,
                is_ground: false,
            },
            create: {
                quantity: 2,
                cart_id: cart.cart_id,
                pw_id: productWeight.pw_id,
                item_subtotal: 200000,
                is_ground: false,
            },
        });

        // 17. Thêm Payment_Method
        const paymentMethod = await prisma.payment_Method.upsert({
            where: { method_id: 1 },
            update: {},
            create: {
                method_name: 'VNPAY',
            },
        });

        console.log('Dữ liệu mẫu đã được thêm');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();