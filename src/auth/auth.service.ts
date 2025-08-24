/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { CreateUserDto, UpdateUserDto } from './dto/user-management.dto';
import { PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type UserResponse = Omit<User, 'password'>;

@Injectable()
export class AuthService {

    constructor(
        @Inject('PrismaClient') private prisma: PrismaClient,
        private jwtService: JwtService
    ) { }

    async register(body: {
        username: string;
        contactNumber: string;
        password: string;
        firstName: string;
        lastName: string;
        barangay: number;
        municipality: number;
        role: Role;
    }) {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        return this.prisma.user.create({
            data: {
                username: body.username,
                contactNumber: body.contactNumber,
                password: hashedPassword,
                firstName: body.firstName,
                lastName: body.lastName,
                barangayId: body.barangay,
                municipalityId: body.municipality,
                role: body.role
            },
        });
    }

    async validateUser({ username, password }: AuthPayloadDto): Promise<any> {
        const findUser = await this.prisma.user.findUnique({
            where: { username },
        });

        if (findUser && (await bcrypt.compare(password, findUser.password))) {
            const { password, ...userWithoutPassword } = findUser;
            return this.login(userWithoutPassword);
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            data: user,
            token: this.jwtService.sign(payload),
        };
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({
            where: { username: createUserDto.username },
        });

        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        if (createUserDto.email) {
            const existingEmail = await this.prisma.user.findUnique({
                where: { email: createUserDto.email },
            });

            if (existingEmail) {
                throw new ConflictException('Email already exists');
            }
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
    }

    async findAllUsers(): Promise<UserResponse[]> {
        return this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                contactNumber: true,
                municipalityId: true,
                barangayId: true,
                createdAt: true,
            },
        });
    }

    async findUserById(id: number): Promise<UserResponse> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                contactNumber: true,
                municipalityId: true,
                barangayId: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse> {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        if (updateUserDto.username) {
            const usernameExists = await this.prisma.user.findUnique({
                where: { 
                    username: updateUserDto.username,
                    NOT: { id }
                },
            });

            if (usernameExists) {
                throw new ConflictException('Username already exists');
            }
        }

        if (updateUserDto.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: { 
                    email: updateUserDto.email,
                    NOT: { id }
                },
            });

            if (emailExists) {
                throw new ConflictException('Email already exists');
            }
        }

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                contactNumber: true,
                municipalityId: true,
                barangayId: true,
                createdAt: true,
            },
        });
    }
}
