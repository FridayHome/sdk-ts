import { bytesConcat } from './utils/byteUtils';

export interface IEncryptor {
	encrypt: (
		message: Uint8Array,
		nonce: Uint8Array,
		publicKey: Uint8Array,
		privateKey: Uint8Array
	) => Promise<Uint8Array>;
	decrypt: (
		message: Uint8Array,
		nonce: Uint8Array,
		privateKey: Uint8Array,
		publicKey: Uint8Array
	) => Promise<Uint8Array>;
	generateNonce: () => Promise<Uint8Array>;
}

export const NONCE_BYTES = 24;

export class Encryption {
	private static encryptor: IEncryptor;

	public static setEncryptor(encryptor: IEncryptor) {
		this.encryptor = encryptor;
	}

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
	public static async encrypt(
		message: Uint8Array,
		privateKey: Uint8Array,
		publicKey: Uint8Array,
		nonce: Uint8Array | undefined = undefined
	): Promise<Uint8Array> {
		if (!nonce) {
			nonce = await this.encryptor.generateNonce();
		}

		const encrypted = await this.encryptor.encrypt(
			message,
			nonce,
			publicKey,
			privateKey
		);

		return bytesConcat(nonce, encrypted);
	}

	/**
	 * Descrypt a message
	 *
	 * @param message to be decrypted
	 * @param privateKey of the receiver
	 * @param publicKey of the sender
	 */
	public static async decrypt(
		message: Uint8Array,
		privateKey: Uint8Array,
		publicKey: Uint8Array
	): Promise<Uint8Array> {
		const nonce = message.slice(0, NONCE_BYTES);
		const cipherText = message.slice(NONCE_BYTES);

		return await this.encryptor.decrypt(
			cipherText,
			nonce,
			privateKey,
			publicKey
		);
	}
}
