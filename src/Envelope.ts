import { IMessage } from './IMessage';
import { KeyID } from './enums/KeyID';
import { BitConverter } from './utils/BitConverter';
import { bytesConcat } from './utils/byteUtils';

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
}
