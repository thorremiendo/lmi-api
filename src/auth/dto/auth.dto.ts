/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AuthPayloadDto {
    @ApiProperty({ example: 'username' })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ example: 'password' })
    @IsOptional()
    @IsString()
    password?: string;
}