/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Body() authPayload: AuthPayloadDto) {
        return await this.authService.validateUser(authPayload)
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
