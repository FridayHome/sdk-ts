import { IMessage } from './IMessage';
import { KeyID } from './enums/KeyID';
import { BitConverter } from './utils/BitConverter';
import { bytesConcat } from './utils/byteUtils';
import { Encryption } from './encryption';

export class Envelope {
	keyId: number;
	message: IMessage;

	constructor(keyId: KeyID, message: IMessage) {
		this.keyId = keyId;
		this.message = message;
	}

	public toBytes(): Uint8Array {
		const body = this.message.toBytes();

		return bytesConcat(
			BitConverter.getBytes(body.length, 2),
			BitConverter.getBytes(this.keyId, 2),
			body
		);
	}

	public async toEncryptedBytes(
		privateKey: Uint8Array,
		publicKey: Uint8Array
	): Promise<Uint8Array> {
		const body = await Encryption.encrypt(
			this.toBytes(),
			privateKey,
			publicKey
		);

		return bytesConcat(
			BitConverter.getBytes(body.length, 2),
			BitConverter.getBytes(this.keyId, 2),
			body
		);
	}
}
