export class GetBlockByIdFilter {
  private readonly blockNumber: number;
  private readonly showFullTransactions: boolean;

  constructor(blockNumber: number, showFullTransactions: boolean) {
    this.blockNumber = blockNumber;
    this.showFullTransactions = showFullTransactions;
  }

  public toQueryParams(): object {
    return {
      tag: this.blockNumber.toString(16),
      boolean: this.showFullTransactions,
    };
  }
}
