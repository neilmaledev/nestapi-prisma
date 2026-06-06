import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { PayloadDto } from "./dto/payload.dto";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    constructor(
        // @Inject(REQUEST) private req: Request, // commented for reference
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signToken(dto: PayloadDto): Promise<string> {
        const payload = {
            username: dto.username,
            email: dto.email
        };

        const tokenSecret = this.config.get('TOKEN_SECRET');
        const tokenExpiry = this.config.get('TOKEN_EXPIRY');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: tokenExpiry,
            secret: tokenSecret
        });

        return token;
    }
    
}