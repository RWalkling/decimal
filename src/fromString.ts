import Decimal from './Decimal'
import { OperationOptions, unaryOperation } from './types'
import { curry } from '@gecks/curry'

interface Options extends OperationOptions {
    readonly decimalDelimiter?: string
    readonly ignore?: string[]
}

const fromString = unaryOperation<Options, string>()(
    (value, { ignore = [], decimalDelimiter = '.', precision }) => {
        const replaced = ignore.reduce(string => value.replace(string, ''), value)

        const match = RegExp(`^(.*[${decimalDelimiter}][0-9]*?)0*$`).exec(replaced)
        if (match === null) throw Error(`String ${value} does not encode a Decimal`)
        const [, preZeros] = match

        const mantissa = BigInt(preZeros.replace(decimalDelimiter, ''))
        const commaPosition = preZeros.lastIndexOf(decimalDelimiter)
        const exponent = BigInt(commaPosition === -1 ? 0n : preZeros.length - commaPosition - 1)

        return new Decimal(mantissa, exponent)
    },
)

export default fromString
export const fromStringC = curry(fromString)
