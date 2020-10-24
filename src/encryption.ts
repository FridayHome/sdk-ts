import sodium from 'libsodium-wrappers';

export class Encryption {
	public static encrypt(
		message: Uint8Array,
		privateKey: Uint8Array,
		publicKey: Uint8Array
	): Uint8Array {
    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
		const encrypted = sodium.crypto_box_easy(message, nonce, publicKey, privateKey);
    const output = new Uint8Array(nonce.length + encrypted.length);
    output.set(nonce, 0);
    output.set(encrypted, nonce.length);

    return output;
	}

	public static decrypt(
		message: Uint8Array,
		privateKey: Uint8Array,
		publicKey: Uint8Array
	): Uint8Array {
		const nonce = message.slice(0, sodium.crypto_box_NONCEBYTES);
		const cipherText = message.slice(sodium.crypto_box_NONCEBYTES);

		return sodium.crypto_box_open_easy(
			cipherText,
			nonce,
			publicKey,
			privateKey
		);
	}
}
