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

	test('decrypt challenge message', () => {
		const privateKey = sodium.from_hex(
			'93cb0d720fdb4a1e202a3b9737c30b409eabd6c9156d488b01d94b833c3942a2'
		);
		const publicKey = sodium.from_hex(
			'4a15a6a548422383f38a3ecfee5ec830877b9bed5af13eaa2c9bf56ca5221976'
		);
		const encrypted = sodium.from_hex(
			'78326e930590fee7b52d7d962885b4bc42a788fbdaf63f89d4aadc24d4eb85288c7cbe7151c0f63f61d39fb000003c17fb262b84'
		);

		const decrypted = Encryption.decrypt(encrypted, privateKey, publicKey);

		const expected = sodium.from_hex('000202000400d321f80deb86');

		expect(decrypted).toEqual(expected);
	});

	test('encrypt challenge message', () => {
		const privateKey = sodium.from_hex(
			'93cb0d720fdb4a1e202a3b9737c30b409eabd6c9156d488b01d94b833c3942a2'
		);
		const publicKey = sodium.from_hex(
			'4a15a6a548422383f38a3ecfee5ec830877b9bed5af13eaa2c9bf56ca5221976'
		);
		const message = sodium.from_hex('000202000400d321f80deb86');
		const nonce = sodium.from_hex(
			'78326e930590fee7b52d7d962885b4bc42a788fbdaf63f89'
		);

		const encrypted = Encryption.encrypt(message, privateKey, publicKey, nonce);

		const expected = sodium.from_hex(
			'78326e930590fee7b52d7d962885b4bc42a788fbdaf63f89d4aadc24d4eb85288c7cbe7151c0f63f61d39fb000003c17fb262b84'
		);

		expect(encrypted).toEqual(expected);
	});

	test('encrypt lock state message', () => {
		const privateKey = sodium.from_hex(
			'a62d5062d73eb12e7d804e5e07a79083abc5bd0e1a8f9cec46a02c708c0aea60'
		);
		const publicKey = sodium.from_hex(
			'4a15a6a548422383f38a3ecfee5ec830877b9bed5af13eaa2c9bf56ca5221976'
		);
		const message = sodium.from_hex('09000200050014a5272b9c6d01f8670209');
		const nonce = sodium.from_hex(
			'f57e429667bad667db006a0a93554531e023cf704c1de389'
		);
		const expected = sodium.from_hex(
			'f57e429667bad667db006a0a93554531e023cf704c1de389adb92076cba2ece88cf1228ac2fd45ca50270d900a5befae6c91bf5702bbcf646d'
		);

		const encrypted = Encryption.encrypt(message, privateKey, publicKey, nonce);

		expect(encrypted).toEqual(expected);
	});
});
