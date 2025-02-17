const { PrismaClient } = require('@prisma/client');

class FlavourNoteService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createFlavourNote(data) {
    return await this.prisma.flavourNote.create({ data });
  }

  async getFlavourNoteById(flavour_id) {
    return await this.prisma.flavourNote.findUnique({
      where: { flavour_id },
    });
  }

  async getAllFlavourNotes() {
    return await this.prisma.flavourNote.findMany();
  }

  async updateFlavourNote(flavour_id, data) {
    return await this.prisma.flavourNote.update({
      where: { flavour_id },
      data,
    });
  }

  async deleteFlavourNote(flavour_id) {
    return await this.prisma.flavourNote.delete({
      where: { flavour_id },
    });
  }
}

module.exports = new FlavourNoteService();
