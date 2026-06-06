import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { JwtGuard } from "src/core/auth/guard";
import { CurrentUser } from "src/core/auth/decorator";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private readonly prisma: PrismaService, private userService: UserService) {
    }

    @Get('me')
    async me(@CurrentUser() user: any) {
        return {
            me: 'neil'
        }
    }

    @Get()
    async get() {
        // const user = await this.prisma.user.findFirst();

        return {
            msg: 'get user',
            // user: user
        }
    }

    @Post()
    async create(@Body() dto: UserDto) {
        return await this.userService.create(dto);
    }
}