import { binaryOperation } from './types'
import Decimal from './Decimal'

const alignExponents = binaryOperation()((first, second, { precision }): {
    readonly alignedFirst: Decimal
    readonly alignedSecond: Decimal
    readonly amount: bigint
    readonly shiftBack: (value: Decimal, amount?: bigint) => Decimal
} => {
    const amount = first.exponent - second.exponent

    if (amount === 0n)
        return {
            alignedFirst: first,
            alignedSecond: second,
            amount: 0n,
            shiftBack: value => value,
        }

    const maybeFlip =
        amount > 0n
            ? (first: Decimal, second: Decimal) => [first, second]
            : (first: Decimal, second: Decimal) => [second, first]

    const [bigger, smaller] = maybeFlip(first, second)
    const adjustedSmaller = shift(smaller, amount)

    const [alignedFirst, alignedSecond] = maybeFlip(bigger, adjustedSmaller)

    return {
        alignedFirst,
        alignedSecond,
        amount,
        // todo: options like precision
        shiftBack(value, shiftAmount) {
            return shift(value, -(shiftAmount ?? amount))
        },
    }
})

export const shift = binaryOperation<{}, Decimal, bigint>()((value, amount, options) => {
    return amount === 0n
        ? value
        : new Decimal(
              amount > 0n ? value.mantissa * 10n ** amount : value.mantissa / 10n ** -amount,
              value.exponent - amount,
          )
})
