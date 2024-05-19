/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @Inject('PrismaClient') private prisma: PrismaClient,
        private jwtService: JwtService
    ) { }


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
