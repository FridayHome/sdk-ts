import { Message } from '../Message';
import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';

export class SetupCodeMessage extends Message {
	code: Uint8Array;

	constructor(protocol: IProtocol, code: Uint8Array) {
		super(MessageType.SetupCode, protocol);
		this.code = code;
	}

	public createBody(): Uint8Array {
		return this.code;
	}
}
