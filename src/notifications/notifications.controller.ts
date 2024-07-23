/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notification')
export class NotificationController {

    constructor(
        private notificationService: NotificationService
    ) { }

    @Post()
    async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
        const { body, sender, contactNumber } = createNotificationDto;
        return this.notificationService.sendNotification(body, sender, contactNumber);
    }

    @Get()
    async getAllNotifications() {
        return this.notificationService.getAllNotifications();
    }

    @Get('/user/:userId')
    async getNotificationsByUserId(@Param('userId') userId: number) {
        return this.notificationService.getNotificationsByUserId(userId);
    }


}