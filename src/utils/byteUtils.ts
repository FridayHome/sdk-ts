/**
 * Converts a string into an array of bytes
 */
export function stringToBytes(str: string): Uint8Array {
	return Uint8Array.from(str.split('').map(x => x.charCodeAt(0)));
}

/**
 * Converts a hex string into a byte array.
 */
export function hexToBytes(hex: string): Uint8Array {
	const bytes = [];
	for (let c = 0; c < hex.length; c += 2) {
		bytes.push(parseInt(hex.substr(c, 2), 16));
	}
	return Uint8Array.from(bytes);
}

/**
 * @returns The bytes formatted as a hex string.
 */
export function bytesToHex(bytes: Uint8Array): string {
	return Array.prototype.map
		.call(bytes, x => ('00' + (x & 0xff).toString(16)).slice(-2))
		.join('')
		.toUpperCase();
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
