/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategry extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    validate(username: string, password: string) {
        const user = this.authService.validateUser({ username, password });

        if (!user) throw new UnauthorizedException()

        return user
    }
} 