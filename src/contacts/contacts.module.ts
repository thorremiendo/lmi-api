/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ContactController } from './contacts.controller';
import { ContactService } from './contacts.service';

@Module({
    controllers: [ContactController],
    providers: [ContactService,
        {
            provide: 'PrismaClient',
            useValue: new PrismaClient(),
        },
    ],
})
export class ContactsModule { }
