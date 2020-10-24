import { Message } from '../Message';
import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';

export class BasicInfoRequest extends Message {
	constructor(protocol: IProtocol) {
		super(MessageType.BasicInfoRequest, protocol);
	}

	protected createBody(): Uint8Array {
		return new Uint8Array();
	}
}
