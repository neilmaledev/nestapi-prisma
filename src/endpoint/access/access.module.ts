import { Module } from "@nestjs/common";
import { AccessController } from "./access.controller";
import { AccessService } from "./access.service";
import { UserService } from "../user/user.service";

@Module({
    controllers: [AccessController],
    providers: [AccessService, UserService]
})
export class AccessModule {}