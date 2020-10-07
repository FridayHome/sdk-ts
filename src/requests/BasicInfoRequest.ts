import { Message } from '../Message';
import { MessageType } from '../MessageType';
import { IProtocol } from '../protocols/IProtocol';
import { Bytes } from '../utils/byteUtils';

export class BasicInfoRequest extends Message {
	constructor(protocol: IProtocol) {
		super(MessageType.BasicInfoRequest, protocol);
	}

	protected createBody(): Bytes {
		return [];
	}
}
