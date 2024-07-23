/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './notifications.service';

@Module({
    controllers: [NotificationController],
    providers: [NotificationService,
        {
            provide: 'PrismaClient',
            useValue: new PrismaClient(),
        },
    ],
})
export class NotificationsModule { }
