/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Body() authPayload: AuthPayloadDto) {
        return await this.authService.validateUser(authPayload)
    }


    @Post('register')
    async register(@Body() body: {
        username: string;
        contactNumber: string;
        password: string;
        firstName: string;
        lastName: string;
        barangay: number;
        role: Role
    }) {
        return this.authService.register(body);
    }

    @ApiBearerAuth()
    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {

        return {
            data: req.user
        }
    }
}
