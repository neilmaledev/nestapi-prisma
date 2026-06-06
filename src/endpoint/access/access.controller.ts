import { Controller, Post, Get, Body, NotFoundException } from "@nestjs/common";
import { AccessDto } from "./dto";
import { AccessService } from "./access.service";

@Controller('access')
export class AccessController {
    constructor(
        private accessService: AccessService,
    ) {}

    @Post('signin')
    async signin(@Body() dto: AccessDto) {

        const { accessToken } = await this.accessService.signin(dto);

        return {
            status: "ok",
            accessToken: accessToken
        };
    }
}