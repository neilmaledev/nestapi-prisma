import { Controller, Post, Get, Body } from "@nestjs/common";
import argon2 from "argon2";
import { EncryptionService } from "src/shared/service/encryption.service";

@Controller('devops')
export class DevopsController {
    constructor(private encryptionService: EncryptionService) {}

    @Get('password-hash')
    async passwordHash() {
        const password = "superagent888";
        return {
            password: password,
            passwordHash: await argon2.hash(password)
        };
    }

    @Get('password-verify')
    async passwordVerify() {
        const passwordHash = "$argon2id$v=19$m=65536,t=3,p=4$TbVFDMRHeuh0HyNdP5nnuA$GmaHwdN/2LCAw2Vd1S/FpcGGHhVIRlW5/OGExWbT/eE";
        const password = "superagent888";

        return {
            password: password,
            passwordHash: await argon2.verify(passwordHash, password)
        };
    }

    @Post('encrypt')
    async encrypt(@Body() dto: {text: string}) {
        return {
            encrypted: this.encryptionService.encrypt(dto.text)
        };
    }

    @Post('decrypt')
    async decrypt(@Body() dto: {text: string}) {
        return {
            decrypted: this.encryptionService.decrypt(dto.text)
        };
    }

}