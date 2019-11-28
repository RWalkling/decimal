export default class Decimal {
    public readonly length: bigint
    private readonly string: string

    public constructor(
        public readonly mantissa: bigint = 0n,
        public readonly exponent: bigint = 0n,
    ) {
        this.string = mantissa.toString()
        this.length = BigInt(
            this.string.startsWith('-') ? this.string.length - 1 : this.string.length,
        )
    }
}
