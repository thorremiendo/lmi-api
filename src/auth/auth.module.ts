/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategry } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'lmis-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategry, JwtStrategy,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ]
})
export class AuthModule { }
