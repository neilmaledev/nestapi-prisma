import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { EndpointModule } from './endpoint/endpoint.module';
import { PrismaModule } from './prisma/prisma.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        CoreModule,
        PrismaModule,
        EndpointModule,
        SharedModule
    ]
})
export class AppModule { }
