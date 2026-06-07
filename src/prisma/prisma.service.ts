import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private config: ConfigService) {

    console.log('config.DATABASE_HOST>>>', config.get('DATABASE_HOST'))
    console.log('config.DATABASE_USER>>>', config.get('DATABASE_USER'))
    console.log('config.DATABASE_PASSWORD>>>', config.get('DATABASE_PASSWORD'))
    console.log('config.DATABASE_NAME>>>', config.get('DATABASE_NAME'))
    console.log('config.DATABASE_PORT>>>', config.get('DATABASE_PORT'))

    const adapter = new PrismaMariaDb({
      host: config.get('DATABASE_HOST'),
      user: config.get('DATABASE_USER'),
      password: config.get('DATABASE_PASSWORD'),
      database: config.get('DATABASE_NAME'),
      port: Number(config.get('DATABASE_PORT')),
      connectionLimit: 5,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma (MariaDB) connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma disconnected');
  }
}