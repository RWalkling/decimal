import Decimal from './Decimal'

type Unary<TOptions, TReturn> = (value: Decimal, options?: TOptions) => TReturn
type Binary<TOptions, TReturn> = (first: Decimal, other: Decimal, options?: TOptions) => TReturn

export const bindUnary = <TOptions, TReturn>(func: Unary<TOptions, TReturn>) =>
    function(this: Decimal, options?: TOptions) {
        return func(this, options)
    }

export const bindBinary = <TOptions, TReturn>(func: Binary<TOptions, TReturn>) =>
    function(this: Decimal, other: Decimal, options?: TOptions) {
        return func(this, other, options)
    }

export const curryUnary = <TOptions, TReturn>(func: Unary<TOptions, TReturn>) => (
    options?: TOptions,
) => (value: Decimal) => func(value, options)

export const curryBinary = <TOptions, TReturn>(func: Binary<TOptions, TReturn>) => (
    options?: TOptions,
) => (first: Decimal) => (second: Decimal) => func(first, second, options)

export const bindBinaryCurry = <TOptions, TReturn>(func: Binary<TOptions, TReturn>) =>
    function(this: Decimal, options?: TOptions) {
        return (other: Decimal) => func(this, other, options)
    }
