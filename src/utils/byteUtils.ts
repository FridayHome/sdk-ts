import sodium from 'libsodium-wrappers';

/**
 * Converts a string into an array of bytes
 */
export function stringToBytes(str: string): Uint8Array {
	return Uint8Array.from(str.split('').map(x => x.charCodeAt(0)));
}

/**
 * @returns The bytes formatted as a hex string.
 */
export function bytesToHex(bytes: Uint8Array): string {
	return sodium.to_hex(bytes).toUpperCase();
}

/**
 * Concatenate an array of Uint8Arrays
 */
export function bytesConcat(...arrays: Uint8Array[]): Uint8Array {
	const bytes = new Uint8Array(
		arrays.map(x => x.length).reduce((acc, l) => acc + l, 0)
	);

	let i = 0;
	arrays.forEach(a => {
		bytes.set(a, i);
		i += a.length;
	});

	return bytes;
}
