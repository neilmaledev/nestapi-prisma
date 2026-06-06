import { Global, Module } from "@nestjs/common";
import { EncryptionService } from "./service/encryption.service";

@Global()
@Module({
    exports: [EncryptionService],
    providers: [EncryptionService]
})
export class SharedModule {}