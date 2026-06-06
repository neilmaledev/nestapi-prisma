import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt' // 'jwt is the default for passport-jwt; it can be customize to be used in AuthGuard
) {
    constructor(config: ConfigService) {
        const secret = config.get('TOKEN_SECRET');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret
        })
    }

    async validate(payload: any) {
        // this is the user's data/payload from req
        return payload;
    }
}