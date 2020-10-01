export function stringToByteArray(str: string): number[] {
	return str.split('').map(x => x.charCodeAt(0));
}

/**
 * @returns The bytes formatted as a hex string.
 */
export function bytesToHex(bytes: number[]): string {
	return bytes
		.map(x => ('0' + (x & 0xff).toString(16)).slice(-2))
		.join('')
		.toUpperCase();
}

/**
 * Utilities for converting byte arrays to numbers.
 * Inspired by BitConverter from C#.
 *
 * Note that all functions regard the data as being in Big Endian.
 */
export class BitConverter {
	/**
	 * @returns The two bytes at index converted to a short.
	 */
	public static toShort(bytes: number[], index = 0): number {
		return bytes
			.slice(index, index + 2)
			.reverse()
			.reduce((acc, value) => (acc << 8) + value, 0);
	}
}
