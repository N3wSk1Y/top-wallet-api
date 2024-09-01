import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetBlockByIdFilter } from '@/Integration/Etherscan/Dto/Filter/GetBlockByIdFilter';
import { TransactionDto } from '@/Integration/Etherscan/Dto/TransactionDto';
import * as process from 'node:process';

@Injectable()
export class EtherscanApi {
  private BASE_URL: string;
  private ETHERSCAN_TOKEN: string;

  constructor() {
    this.BASE_URL = 'https://api.etherscan.io/api';
    this.ETHERSCAN_TOKEN = process.env.ETHERSCAN_TOKEN;
  }

  public async getLatestBlockNumber(): Promise<number> {
    const response = await axios.request({
      method: 'GET',
      url: this.BASE_URL,
      params: {
        apikey: this.ETHERSCAN_TOKEN,
        module: 'proxy',
        action: 'eth_blockNumber',
      },
    });

    return parseInt(response.data.result);
  }

  public async getBlockTransactionsById(blockNumber: number): Promise<TransactionDto[]> {
    const filter = new GetBlockByIdFilter(blockNumber, true);
    const response = await axios.request({
      method: 'GET',
      url: this.BASE_URL,
      params: {
        apikey: this.ETHERSCAN_TOKEN,
        module: 'proxy',
        action: 'eth_getBlockByNumber',
        ...filter.toQueryParams(),
      },
    });

    const rawTransactions = response.data.result.transactions;
    return rawTransactions.map((trn) => new TransactionDto(trn.from, trn.to, trn.value));
  }
}
