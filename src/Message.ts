import { IMessageHeader } from './header/IMessageHeader';
import { MessageHeader } from './header/MessageHeader';
import { IMessage } from './IMessage';
import { MessageType } from './MessageType';
import { IProtocol } from './protocols/IProtocol';
import { Bytes } from './utils/byteUtils';

/**
 * Message which can be send or received by the lock.
 */
export abstract class Message implements IMessage {
	header: IMessageHeader;

	protected constructor(type: MessageType, protocol: IProtocol) {
		this.header = new MessageHeader(type, protocol);
	}

	public toBytes(): Bytes {
		return this.header.toBytes().concat(this.createBody());
	}

	protected abstract createBody(): Bytes;
}
