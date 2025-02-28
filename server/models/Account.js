import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// const tempData = {
//     account_name: 'Alohaii',
//     email: 'alohaii@gmail.com',
//     phone: '98239823',
//     password: '11111'
// }

// working
export const createAccount = async (data) => {
    return await prisma.account.create({
        data: data
    });
}

// working
export const findAccountByEmail = async (email) => {
    return await prisma.account.findUnique({
        where: {
            email: email
        }
    });
}

export const getAllAccounts = async () => {
    return await prisma.account.findMany();
};

// const data = {
//     account_name: 'lkjljlsdf',
//     email: 'example@example.com',
//     phone: '000090909'
//     password: 'hashedPassword',
//     is_admin: false,
// };
// date_created and account_id are auto generated
