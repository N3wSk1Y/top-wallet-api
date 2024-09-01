import { Module } from '@nestjs/common';
import { TransactionService } from '@/Transaction/TransactionService';
import { TransactionController } from '@/Transaction/TransactionController';
import { EtherscanModule } from '@/Integration/Etherscan/EtherscanModule';

@Module({
  imports: [EtherscanModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
