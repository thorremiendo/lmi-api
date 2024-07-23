/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { AppNotification, PrismaClient } from '@prisma/client';

@Injectable()
export class NotificationService {

    constructor(@Inject('PrismaClient') private prisma: PrismaClient) { }

    async sendNotification(body: string, sender: string, contactNumber: string): Promise<AppNotification> {
        let recipient = await this.prisma.recipient.findUnique({
            where: { contactNumber },
        });

        if (!recipient) {
            recipient = await this.prisma.recipient.create({
                data: { contactNumber },
            });
        }

        return this.prisma.appNotification.create({
            data: {
                body,
                sender,
                dateTime: new Date(),
                recipientId: recipient.id,
            },
        });
    }

    async getAllNotifications(): Promise<(AppNotification & { contactNumber: string })[]> {
        const notifications = await this.prisma.appNotification.findMany({
            include: {
                Recipient: true,
            },
        });

        return notifications.map(notification => ({
            ...notification,
            contactNumber: notification.Recipient?.contactNumber,
        }));
    }

    async getNotificationsByUserId(userId: number): Promise<(AppNotification & { contactNumber: string })[]> {
        const id = parseInt(userId.toString())
        const user = await this.prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const notifications = await this.prisma.appNotification.findMany({
            where: {
                Recipient: {
                    contactNumber: user.contactNumber,
                },
            },
            include: {
                Recipient: true,
            },
        });

        return notifications.map(notification => ({
            ...notification,
            contactNumber: notification.Recipient.contactNumber,
        }));
    }
}
