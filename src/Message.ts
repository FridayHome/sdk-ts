import { IMessageHeader } from './header/IMessageHeader';
import { MessageHeader } from './header/MessageHeader';
import { IMessage } from './IMessage';
import { MessageType } from './enums/MessageType';
import { IProtocol } from './protocols/IProtocol';
import { bytesConcat } from './utils/byteUtils';

/**
 * Message which can be send or received by the lock.
 */
export abstract class Message implements IMessage {
	header: IMessageHeader;

	protected constructor(type: MessageType, protocol: IProtocol) {
		this.header = new MessageHeader(type, protocol);
	}

	public toBytes(): Uint8Array {
		return bytesConcat(this.header.toBytes(), this.createBody());
	}

	protected abstract createBody(): Uint8Array;
}
