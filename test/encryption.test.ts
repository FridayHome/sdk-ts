import sodium from 'libsodium-wrappers';
import { Encryption } from '../src/encryption';

describe('Encryption', () => {
	test('message', async () => {
    await sodium.ready;
		const privateKey = sodium.crypto_box_keypair().privateKey;
		const recipientPublicKey = Uint8Array.from([
			151,
			164,
			125,
			240,
			169,
			89,
			220,
			189,
			84,
			217,
			178,
			128,
			227,
			130,
			254,
			182,
			22,
			234,
			160,
			253,
			155,
			43,
			146,
			92,
			77,
			249,
			94,
			198,
			73,
			205,
			244,
			72,
		]);
		const message = Uint8Array.from([0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

		const encrypted = Encryption.encrypt(
			message,
			privateKey,
			recipientPublicKey
		);
		const decrypted = Encryption.decrypt(
			encrypted,
			privateKey,
			recipientPublicKey
		);

		expect(decrypted).toEqual(message);
	});
});
