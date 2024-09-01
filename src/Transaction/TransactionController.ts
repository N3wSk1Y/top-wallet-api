import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from '@/Transaction/TransactionService';
import { WalletDto } from '@/Transaction/Dto/WalletDto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/turnover/top')
  async getTopWalletByLatestBlocks(@Query('inLatestBlocks') latestBlocksQuantity: number): Promise<WalletDto> {
    return await this.transactionService.getTopAddressByAbsoluteValue(latestBlocksQuantity || 100);
  }
}
