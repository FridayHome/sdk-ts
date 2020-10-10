export type Bytes = number[];

/**
 * Converts a string into an array of bytes
 */
export function stringToBytes(str: string): Bytes {
	return str.split('').map(x => x.charCodeAt(0));
}

/**
 * Converts an array of bytes into a string
 */
export function bytesToString(bytes: Bytes): string {
	return bytes.map(x => String.fromCharCode(x)).join('');
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
