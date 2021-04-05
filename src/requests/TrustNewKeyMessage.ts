import { Message } from '../Message';
import { MessageType } from '../enums';
import { IProtocol } from '../protocols/IProtocol';
import { AccessInfo } from '../models';
import { bytesConcat } from '../utils/byteUtils';
import { dateToBytes } from '../utils/timing';
import { BitConverter } from 'utils/BitConverter';

export class TrustNewKeyMessage extends Message {
	keyExpiry: Date;
	messageExpiry: Date;
	keySlot: number;
	access: AccessInfo;
	publicKey: Uint8Array;

	constructor(
		protocol: IProtocol,
		keySlotNumber: number,
		publicKey: Uint8Array,
		keyValidTo: Date,
		accessInfo: AccessInfo,
		messageValidTo: Date
	) {
		super(MessageType.TrustNewKey, protocol);
		this.keyExpiry = keyValidTo;
		this.messageExpiry = messageValidTo;
		this.keySlot = keySlotNumber;
		this.access = accessInfo;
		this.publicKey = publicKey;
	}

	public createBody(): Uint8Array {
		return bytesConcat(
			dateToBytes(this.keyExpiry),
			dateToBytes(this.messageExpiry),
			BitConverter.getBytes(this.keySlot, 2),
			BitConverter.getBytes(this.access.getFlags(), 4),
			this.publicKey
		);
	}
}
