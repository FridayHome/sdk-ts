import { IMessage } from './IMessage';
import { KeyID } from './enums/KeyID';
import { BitConverter } from './utils/BitConverter';
import { Bytes } from './utils/byteUtils';

export class Envelope {
	keyId: number;
	message: IMessage;

	constructor(keyId: KeyID, message: IMessage) {
		this.keyId = keyId;
		this.message = message;
	}

	public toBytes(): Bytes {
		const body = this.message.toBytes();

		return BitConverter.getBytes(body.length, 2).concat(
			BitConverter.getBytes(this.keyId, 2),
			body
		);
	}
}
