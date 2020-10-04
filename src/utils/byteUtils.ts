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
