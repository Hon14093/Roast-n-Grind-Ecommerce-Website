import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPayment = async (data) => {
    return await prisma.account_Payment_Method.create({
        data: data
    });
};

export const findPaymentById = async (id) => {
    return await prisma.account_Payment_Method.findUnique({
        where: { apm_id: id } // Fixed field name
    });
};

export const getPaymentsByAccountId = async (accountId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { account_id: accountId } // Fixed field name
    });
};

export const getAllPayments = async () => {
    return await prisma.account_Payment_Method.findMany();
};

export const getPaymentsByMethod = async (methodId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { method_id: methodId } // Fixed field name
    });
};

export const updatePayment = async (id, data) => {
    return await prisma.account_Payment_Method.update({
        where: { apm_id: id },
        data: data
    });
};

export const deletePayment = async (id) => {
    return await prisma.account_Payment_Method.delete({
        where: { apm_id: id }
    });
};

export const deletePaymentByAccountId = async (accountId) => {
    return await prisma.account_Payment_Method.deleteMany({
        where: { account_id: accountId } // Fixed field name
    });
};

export const deletePaymentByMethodId = async (methodId) => {
    return await prisma.account_Payment_Method.deleteMany({
        where: { method_id: methodId } // Fixed field name
    });
};

export const deletePaymentByAccountIdAndMethodId = async (accountId, methodId) => {
    return await prisma.account_Payment_Method.deleteMany({
        where: { 
            account_id: accountId, // Fixed field name
            method_id: methodId // Fixed field name
        }
    });
};

export const getPaymentByAccountIdAndMethodId = async (accountId, methodId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { 
            account_id: accountId, // Fixed field name
            method_id: methodId // Fixed field name
        }
    });
};

export const getPaymentByAccountIdAndMethodIdAndPaymentId = async (accountId, methodId, paymentId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { 
            account_id: accountId, // Fixed field name
            method_id: methodId, // Fixed field name
            apm_id: paymentId // Fixed field name
        }
    });
};

export const getPaymentByAccountIdAndPaymentId = async (accountId, paymentId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { 
            account_id: accountId, // Fixed field name
            apm_id: paymentId // Fixed field name
        }
    });
};

export const getPaymentByMethodIdAndPaymentId = async (methodId, paymentId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { 
            method_id: methodId, // Fixed field name
            apm_id: paymentId // Fixed field name
        }
    });
};

export const getPaymentByPaymentId = async (paymentId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { 
            apm_id: paymentId // Fixed field name
        }
    });
};

export const getPaymentByAccountId = async (accountId) => {
    return await prisma.account_Payment_Method.findMany({
        where: { 
            account_id: accountId // Fixed field name
        }
    });
};
