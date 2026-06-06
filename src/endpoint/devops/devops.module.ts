import { Module } from "@nestjs/common";
import { DevopsController } from "./devops.controller";

@Module({
    controllers: [DevopsController],
    providers: []
})
export class DevopsModule {}