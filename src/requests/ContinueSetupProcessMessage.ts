import { Message } from '../Message';
import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';

export class ContinueSetupProcessMessage extends Message {
	constructor(protocol: IProtocol) {
		super(MessageType.ContinueSetupProcess, protocol);
	}

	public createBody(): Uint8Array {
		return new Uint8Array();
	}
}
