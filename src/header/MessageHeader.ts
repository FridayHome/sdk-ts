import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';
import { BitConverter } from '../utils/BitConverter';
import { bytesConcat } from '../utils/byteUtils';
import { IMessageHeader } from './IMessageHeader';

export class MessageHeader implements IMessageHeader {
	messageType: MessageType;
	protocol: IProtocol;

	constructor(messageType: MessageType, protocol: IProtocol) {
		this.messageType = messageType;
		this.protocol = protocol;
	}

	toBytes(): Uint8Array {
		return bytesConcat(
			BitConverter.getBytes(this.messageType, 2),
			BitConverter.getBytes(this.protocol.Version, 2),
			this.protocol.toBytes()
		);
	}
}
