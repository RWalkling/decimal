import Decimal from './Decimal'

export interface OperationOptions {
    readonly precision?: bigint
}

export interface UnaryOperationOptions extends OperationOptions {}

export interface UnaryOperation<
    ValueType = Decimal,
    TOptions extends object = {},
    ReturnType = Decimal
> {
    (value: ValueType, options?: TOptions & UnaryOperationOptions): ReturnType
    (options: TOptions & UnaryOperationOptions & { readonly value: ValueType }): ReturnType
}

export const unaryOperation = <TOptions extends object = {}, TValue = Decimal>() => <TReturn>(
    func: (value: TValue, options: TOptions & UnaryOperationOptions) => TReturn,
): UnaryOperation<TValue, TOptions, TReturn> => (...args: any[]) => {
    const [value, options] = (() => {
        const hasNoValueProperty =
            typeof args[0] !== 'object' || args[0] === null || !args[0].hasOwnProperty('value')

        if (args.length === 2 && hasNoValueProperty) return args
        return [args[0].value, args[0]]
    })()
    return func(value, options)
}

export interface BinaryOperationOptions extends OperationOptions {}

export interface BinaryOperation<
    FirstValueType = Decimal,
    SecondValueType = Decimal,
    TOptions extends object = {},
    ReturnType = Decimal
> {
    (
        first: FirstValueType,
        second: SecondValueType,
        options?: TOptions & BinaryOperationOptions,
    ): ReturnType
    (
        options: TOptions &
            BinaryOperationOptions & {
                readonly first: FirstValueType
                readonly second: SecondValueType
            },
    ): ReturnType
}

export const binaryOperation = <
    TOptions extends object = {},
    TFirst = Decimal,
    TSecond = Decimal
>() => <TReturn>(
    func: (first: TFirst, second: TSecond, options: TOptions & UnaryOperationOptions) => TReturn,
): BinaryOperation<TFirst, TSecond, TOptions, TReturn> => (...args: any[]) => {
    const [first, second, options] = (() => {
        if (args.length >= 2) return args
        return [args[0].first, args[0].second, args[0]]
    })()
    return func(first, second, options)
}
