import { Injectable } from '@nestjs/common';
import { EtherscanApi } from '@/Integration/Etherscan/EtherscanApi';
import { WalletDto } from '@/Transaction/Dto/WalletDto';

@Injectable()
export class TransactionService {
  constructor(private readonly etherscanApi: EtherscanApi) {}

  public async getTopAddressByAbsoluteValue(latestTransactionsQuantity: number): Promise<WalletDto> {
    const latestBlockNumber = await this.etherscanApi.getLatestBlockNumber();
    const balanceChanges = new Map<string, number>();

    for (
      let blockNumber = latestBlockNumber;
      blockNumber >= latestBlockNumber - latestTransactionsQuantity;
      blockNumber--
    ) {
      const transactions = await this.etherscanApi.getBlockTransactionsById(blockNumber);

      for (const trx of transactions) {
        const fromBalance = balanceChanges.get(trx.fromAddress) || 0;
        balanceChanges.set(trx.fromAddress, fromBalance - trx.value);

        const toBalance = balanceChanges.get(trx.toAddress) || 0;
        balanceChanges.set(trx.toAddress, toBalance + trx.value);
      }
    }

    const maxAddress = this.getAbsoluteValueTopAddress(balanceChanges);
    return new WalletDto(maxAddress);
  }

  private getAbsoluteValueTopAddress(balanceChanges: Map<string, number>): string {
    let maxChange = 0;
    let maxAddress: string | null = null;

    for (const [address, balance] of balanceChanges) {
      const absBalance = Math.abs(balance);
      if (absBalance > maxChange) {
        maxChange = absBalance;
        maxAddress = address;
      }
    }

    return maxAddress;
  }
}
