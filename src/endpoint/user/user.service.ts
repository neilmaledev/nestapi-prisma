import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import argon2 from "argon2";
import { UserDto } from "./dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: UserDto) {
        const passwordHash = await argon2.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    uid: 'test3',
                    email: dto.email,
                    username: dto.username,
                    password: passwordHash,
                    createdBy: 'SYSTEM',
                    updatedBy: 'SYSTEM'
                }
            });

            const { password, ...safeUser } = user;

            return safeUser;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                 if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                 }
            }

            throw error;
        }
    }

    async getByUsername(username: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                username: username
            }
        });

        return user;
    }
}