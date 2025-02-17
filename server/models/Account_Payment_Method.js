import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class AccountPaymentMethod {
    constructor() {
        this.prisma = prisma;
    }

    async createPayment(data) {
        return await this.prisma.account_Payment_Method.create({
            data: data,
        });
    }

    async findPaymentId(id) {
        return await this.prisma.account_Payment_Method.findUnique({
            where: { apm_id: id }, 
        });
    }

    async getPaymentsByAccountId(accountId) {
        return await this.prisma.account_Payment_Method.findMany({
            where: { account_id: accountId }, 
        });
    }

    async getAllPayments() {
        return await this.prisma.account_Payment_Method.findMany();
    }

    async getPaymentsByMethod(methodId) {
        return await this.prisma.account_Payment_Method.findMany({
            where: { method_id: methodId }, 
        });
    }
}

export default new AccountPaymentMethod();
