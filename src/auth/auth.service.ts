/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
                municipalityId: null,
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
}
