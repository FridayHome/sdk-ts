import { Bytes } from './byteUtils';

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

	/**
	 * Convert a number to a byte array.
	 *
	 * @param number to convert
	 * @param minSize the minimum number of entries in the byte array
	 * @returns the number represented as a array of bytes
	 */
	public static getBytes(number: number, minSize = 0): Bytes {
		const bytes: Bytes = [];

		let i = 0;
		while (i++ < minSize || number > 0) {
			bytes.push(number % 256);
			number = Math.floor(number / 256);
		}

		return bytes;
	}
}
