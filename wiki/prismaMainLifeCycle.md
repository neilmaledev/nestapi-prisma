1. Setup the .env for prisma main config

2. In src/prisma/prisma.service.ts
- adapter PrismaMariaDb is set

3. In src/prisma/prisma.module.ts
- set the PrismaModule and provide/export PrismaService

4. In src/app.module.ts
- set the AppModule and import PrismaModule

5. Now we can inject the PrismaService in any class via the constructor
- `private readonly prisma: PrismaService`
- then we can use it inside class via example: `await this.prisma.user.findFirst()`