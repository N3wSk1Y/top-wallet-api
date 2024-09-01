import { Web3Utils } from '@/Shared/Web3Utils';

export class TransactionDto {
  fromAddress: string;
  toAddress: string;
  value: number;

  constructor(fromAddress: string, toAddress: string, value: string) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.value = Web3Utils.convertWeiToEth(value);
  }
}
