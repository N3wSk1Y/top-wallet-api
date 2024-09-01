import { Module } from '@nestjs/common';
import { TransactionModule } from '@/Transaction/TransactionModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TransactionModule,
  ],
})
export class AppModule {}
