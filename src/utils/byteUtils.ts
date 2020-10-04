export type Bytes = number[];

export function stringToByteArray(str: string): Bytes {
	return str.split('').map(x => x.charCodeAt(0));
}

/**
 * @returns The bytes formatted as a hex string.
 */
export function bytesToHex(bytes: Bytes): string {
	return bytes
		.map(x => ('0' + (x & 0xff).toString(16)).slice(-2))
		.join('')
		.toUpperCase();
}

/**
 * Utilities for converting byte arrays to numbers.
 *
 * Note that all functions regard the data as being in Big Endian.
 */
export class BitConverter {
	/**
	 * @returns The two bytes at index converted to a short.
	 */
	public static toInt16(bytes: Bytes, index = 0): number {
		return this.toNumber(bytes, 2, index);
	}

	/**
	 * @returns the 4 bytes at the given index as a int.
	 */
	public static toInt32(bytes: Bytes, index = 0): number {
		return this.toNumber(bytes, 4, index);
	}

	/**
	 * Extract a number from the bytes array.
	 *
	 * @param bytes array containing the number
	 * @param size of the number to extract, e.g. 2 for short
	 * @param index in the bytes array to start reading the number
	 * @returns the number at the specified index
	 */
	public static toNumber(bytes: Bytes, size: number, index = 0): number {
		return bytes
			.slice(index, index + size)
			.reverse()
			.reduce((acc, value) => (acc << 8) + value, 0);
	}

	public static getBytes(number: number): Bytes {
		const bytes: Bytes = [];

		while (number > 0) {
			bytes.push(number % 256);
			number = Math.floor(number / 256);
		}

		return bytes;
	}
}
