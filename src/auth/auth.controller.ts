/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Param, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user-management.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AdminGuard } from './guards/admin.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
        municipality: number;
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

    @ApiBearerAuth()
    @Post('users')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiOperation({ summary: 'Create a new user (Admin only)' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 409, description: 'Username or email already exists' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.authService.createUser(createUserDto);
    }

    @ApiBearerAuth()
    @Get('users')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiOperation({ summary: 'Get all users (Admin only)' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async getAllUsers() {
        return await this.authService.findAllUsers();
    }

    @ApiBearerAuth()
    @Get('users/:id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiOperation({ summary: 'Get user by ID (Admin only)' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.authService.findUserById(id);
    }

    @ApiBearerAuth()
    @Put('users/:id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiOperation({ summary: 'Update user by ID (Admin only)' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'Username or email already exists' })
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return await this.authService.updateUser(id, updateUserDto);
    }
}
