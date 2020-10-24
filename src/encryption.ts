import sodium from 'libsodium-wrappers';

export class Encryption {
  /**
   * Encrypt and sign a byte array with a given
   * public and private key.
   *
   * @param message to be encrypted
   * @param privateKey of the sender of the message
   * @param publicKey of the intended receiver of the message
   * @param nonce Specify a nonce this message should be
   * encrypted with. NOTE: you should never need to specify
   * this in production, as a new nonce should be generated
   * for each message.
   */
	public static encrypt(
		message: Uint8Array,
		privateKey: Uint8Array,
		publicKey: Uint8Array,
		nonce: Uint8Array | undefined = undefined
	): Uint8Array {
		if (!nonce) {
			nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    }
		const encrypted = sodium.crypto_box_easy(
			message,
			nonce,
			publicKey,
			privateKey
		);
		const output = new Uint8Array(nonce.length + encrypted.length);
		output.set(nonce, 0);
		output.set(encrypted, nonce.length);

		return output;
	}

  /**
   * Descrypt a message
   *
   * @param message to be decrypted
   * @param privateKey of the receiver
   * @param publicKey of the sender
   */
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
