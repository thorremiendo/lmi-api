/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Contact } from '@prisma/client';
import { ContactOrUser, ContactService } from './contacts.service';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {

    constructor(private readonly contactService: ContactService) { }

    @Post()
    async createContact(@Body() data: Omit<Contact, 'id'>): Promise<Contact> {
        return this.contactService.createContact(data);
    }

    @Get()
    async getContacts(): Promise<ContactOrUser[]> {
        return this.contactService.getContacts();
    }

    @Get(':id')
    async getContactById(@Param('id', ParseIntPipe) id: number): Promise<Contact | null> {
        return this.contactService.getContactById(id);
    }

    @Put(':id')
    async updateContact(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Contact>
    ): Promise<Contact> {
        return this.contactService.updateContact(id, data);
    }

    @Delete(':id')
    async deleteContact(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
        return this.contactService.deleteContact(id);
    }
}