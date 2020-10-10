import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';
import { BitConverter } from '../utils/BitConverter';
import { Bytes } from '../utils/byteUtils';
import { IMessageHeader } from './IMessageHeader';

export class MessageHeader implements IMessageHeader {
	messageType: MessageType;
	protocol: IProtocol;

	constructor(messageType: MessageType, protocol: IProtocol) {
		this.messageType = messageType;
		this.protocol = protocol;
	}

	toBytes(): Bytes {
		return BitConverter.getBytes(this.messageType, 2).concat(
			BitConverter.getBytes(this.protocol.Version, 2),
			this.protocol.toBytes()
		);
	}
}
