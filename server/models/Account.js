import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAccount = async (data) => {
    return await prisma.account.create({ data });
}

export const findAccountByEmail = async (email) => {
    return await prisma.account.findUnique({
        where: { email }
    });
}

// const data = {
//     account_name: 'lkjljlsdf',
//     email: 'example@example.com',
//     phone: '000090909'
//     password: 'hashedPassword',
//     is_admin: false,
// };
// date_created and account_id are auto generated
