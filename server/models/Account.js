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

export const getAccountInfo = async (account_id) => {
    return await prisma.account.findFirst({
        select: {
            account_id: true,
            account_name: true,
            email: true,
            phone: true,
            date_created: true,
            password: false
        },
        where: {account_id: account_id}
    });
}

export const getTotalAccounts = async () => {
    return await prisma.account.count();
}


// const data = {
//     account_name: 'lkjljlsdf',
//     email: 'example@example.com',
//     phone: '000090909'
//     password: 'hashedPassword',
//     is_admin: false,
// };
// date_created and account_id are auto generated
