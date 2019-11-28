export default function toBase4294967296(value: bigint): Uint32Array {
    const hexString = value.toString(16)
    const misalignment = hexString.length % 8
    const length = Math.ceil(hexString.length / 8)

    const result = new Uint32Array(length)

    let cursor = 0
    let index = 0

    const step = (offset: number) =>
        (result[index++] = parseInt(hexString.slice(cursor, (cursor += offset)), 16))

    if (misalignment) step(misalignment)
    while (cursor < hexString.length) step(8)

    return result
}
