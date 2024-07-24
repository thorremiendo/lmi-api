/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Barangay, Contact, Municipality, PrismaClient } from '@prisma/client';

export interface ContactOrUser {
    id: number;
    municipalityId: number | null;
    barangayId: number | null;
    firstName: string;
    lastName: string;
    contactNumber: string;
    Municipality: Municipality | null;
    Barangay: Barangay | null;
}

@Injectable()
export class ContactService {

    constructor(@Inject('PrismaClient') private prisma: PrismaClient) { }

    async createContact(data: Omit<Contact, 'id'>): Promise<Contact> {
        return this.prisma.contact.create({ data });
    }

    async getContacts(): Promise<ContactOrUser[]> {
        const contacts = await this.prisma.contact.findMany({
            include: {
                Municipality: true,
                Barangay: true,
            },
        });

        const users = await this.prisma.user.findMany({
            where: {
                role: 'Others',
            },
            select: {
                id: true,
                municipalityId: true,
                barangayId: true,
                firstName: true,
                lastName: true,
                contactNumber: true,
                Municipality: true,
                Barangay: true,
            },
        });

        const combined = [...contacts, ...users];

        return combined;
    }

    async getContactById(id: number): Promise<Contact | null> {
        return this.prisma.contact.findUnique({
            where: { id },
            include: {
                Municipality: true,
                Barangay: true,
            },
        });
    }

    async updateContact(id: number, data: Partial<Contact>): Promise<Contact> {
        return this.prisma.contact.update({
            where: { id },
            data,
        });
    }

    async deleteContact(id: number): Promise<Contact> {
        return this.prisma.contact.delete({
            where: { id },
        });
    }
}