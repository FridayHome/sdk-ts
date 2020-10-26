import sodium from 'libsodium-wrappers';
import { hexToBytes } from '../src';
import { Encryption } from '../src/encryption';
import { IEncryptorMock } from './mocks/IEncryptorMock';

describe('Encryption', () => {
	// Encryption mock
	Encryption.encryptor = IEncryptorMock;

	test('message', async () => {
		await sodium.ready;
		const sender = sodium.crypto_box_keypair();
		const receiver = sodium.crypto_box_keypair();
		const message = Uint8Array.from([0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

		const encrypted = await Encryption.encrypt(
			message,
			sender.privateKey,
			receiver.publicKey
		);
		const decrypted = await Encryption.decrypt(
			encrypted,
			receiver.privateKey,
			sender.publicKey
		);

		expect(decrypted).toEqual(message);
	});

	test('decrypt challenge message', async () => {
		const privateKey = hexToBytes(
			'93cb0d720fdb4a1e202a3b9737c30b409eabd6c9156d488b01d94b833c3942a2'
		);
		const publicKey = hexToBytes(
			'4a15a6a548422383f38a3ecfee5ec830877b9bed5af13eaa2c9bf56ca5221976'
		);
		const encrypted = hexToBytes(
			'78326e930590fee7b52d7d962885b4bc42a788fbdaf63f89d4aadc24d4eb85288c7cbe7151c0f63f61d39fb000003c17fb262b84'
		);

		const decrypted = await Encryption.decrypt(
			encrypted,
			privateKey,
			publicKey
		);

		const expected = hexToBytes('000202000400d321f80deb86');

		expect(decrypted).toEqual(expected);
	});

	test('encrypt challenge message', async () => {
		const privateKey = hexToBytes(
			'93cb0d720fdb4a1e202a3b9737c30b409eabd6c9156d488b01d94b833c3942a2'
		);
		const publicKey = hexToBytes(
			'4a15a6a548422383f38a3ecfee5ec830877b9bed5af13eaa2c9bf56ca5221976'
		);
		const message = hexToBytes('000202000400d321f80deb86');
		const nonce = hexToBytes(
			'78326e930590fee7b52d7d962885b4bc42a788fbdaf63f89'
		);

		const encrypted = await Encryption.encrypt(
			message,
			privateKey,
			publicKey,
			nonce
		);

		const expected = hexToBytes(
			'78326e930590fee7b52d7d962885b4bc42a788fbdaf63f89d4aadc24d4eb85288c7cbe7151c0f63f61d39fb000003c17fb262b84'
		);

		expect(encrypted).toEqual(expected);
	});

	test('encrypt lock state message', async () => {
		const privateKey = hexToBytes(
			'a62d5062d73eb12e7d804e5e07a79083abc5bd0e1a8f9cec46a02c708c0aea60'
		);
		const publicKey = hexToBytes(
			'4a15a6a548422383f38a3ecfee5ec830877b9bed5af13eaa2c9bf56ca5221976'
		);
		const message = hexToBytes('09000200050014a5272b9c6d01f8670209');
		const nonce = hexToBytes(
			'f57e429667bad667db006a0a93554531e023cf704c1de389'
		);
		const expected = hexToBytes(
			'f57e429667bad667db006a0a93554531e023cf704c1de389adb92076cba2ece88cf1228ac2fd45ca50270d900a5befae6c91bf5702bbcf646d'
		);

		const encrypted = await Encryption.encrypt(
			message,
			privateKey,
			publicKey,
			nonce
		);

		expect(encrypted).toEqual(expected);
	});
});
