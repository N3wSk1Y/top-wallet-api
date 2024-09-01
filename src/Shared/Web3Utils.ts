export class Web3Utils {
  public static convertWeiToEth(hex: string): number {
    const wei = BigInt(hex);
    return Number(wei) / 10 ** 18;
  }
}
