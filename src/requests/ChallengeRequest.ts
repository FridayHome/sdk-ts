import { MessageType } from '../enums/MessageType';
import { Message } from '../Message';
import { IProtocol } from '../protocols/IProtocol';

export class ChallengeRequest extends Message {
	constructor(protocol: IProtocol) {
		super(MessageType.ChallengeRequest, protocol);
	}

	protected createBody(): Uint8Array {
		return new Uint8Array();
	}
}
