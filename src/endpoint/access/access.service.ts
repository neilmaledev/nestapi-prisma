import { Injectable, NotFoundException } from "@nestjs/common";
import argon2 from "argon2";
import { AccessDto } from "./dto";
import { UserService } from "../user/user.service";
import { AuthService } from "src/core/auth/auth.service";

@Injectable()
export class AccessService {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    async signin(dto: AccessDto) {
        const user = await this.verifyCredentials(dto);

        const token = await this.authService.signToken({
            username: user.username,
            email: user.email
        });

        return {
            accessToken: token
        };
    }

    private async verifyCredentials(dto: AccessDto) {
        const user = await this.userService.getByUsername(dto.username);

        if (!user) {
            console.error('AccessService.signin >> User not found');
            throw new NotFoundException('Credentials did not match');
        }

        const isPasswordVerified = await argon2.verify(user.password, dto.password);

        if (!isPasswordVerified) {
            console.error('AccessService.signin >> Password is incorrect');
            throw new Error('Credentials did not match');
        }

        return user;
    }


}