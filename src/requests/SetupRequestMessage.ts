import { Message } from '../Message';
import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';

export class SetupRequestMessage extends Message {
	publicKey: Uint8Array;

	constructor(protocol: IProtocol, publicKey: Uint8Array) {
		super(MessageType.SetupRequest, protocol);
		this.publicKey = publicKey;
	}

	public createBody(): Uint8Array {
		return this.publicKey;
	}
}
