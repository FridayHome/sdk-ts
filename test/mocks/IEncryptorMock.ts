import sodium from 'libsodium-wrappers';
import { IEncryptor, NONCE_BYTES } from '../../src/encryption';

export const IEncryptorMock: IEncryptor = {
	encrypt: (
		message: Uint8Array,
		nonce: Uint8Array,
		publicKey: Uint8Array,
		privateKey: Uint8Array
	): Promise<Uint8Array> =>
		new Promise<Uint8Array>(resolve =>
			resolve(sodium.crypto_box_easy(message, nonce, publicKey, privateKey))
		),
	decrypt: (
		message: Uint8Array,
		nonce: Uint8Array,
		privateKey: Uint8Array,
		publicKey: Uint8Array
	): Promise<Uint8Array> =>
		new Promise<Uint8Array>(resolve =>
			resolve(
				sodium.crypto_box_open_easy(message, nonce, publicKey, privateKey)
			)
		),
	generateNonce: () =>
		new Promise<Uint8Array>(resolve =>
			resolve(sodium.randombytes_buf(NONCE_BYTES))
		),
};
