import { Module } from '@nestjs/common';
import { EtherscanApi } from '@/Integration/Etherscan/EtherscanApi';

@Module({
  providers: [EtherscanApi],
  exports: [EtherscanApi],
})
export class EtherscanModule {}
