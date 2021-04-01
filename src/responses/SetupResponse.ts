import { Message } from '../Message';
import { IProtocol } from '../protocols/IProtocol';
import { MessageType } from '../enums/MessageType';

export class SetupResponse extends Message {
	publicKey: Uint8Array;

	constructor(protocol: IProtocol, publicKey: Uint8Array) {
		super(MessageType.SetupResponse, protocol);
		this.publicKey = publicKey;
	}

	public createBody(): Uint8Array {
		throw new Error('Method not implemented.');
	}

	public static parse(protocol: IProtocol, bytes: Uint8Array): SetupResponse {
		const publicKey = bytes.slice(0, 32);

		return new SetupResponse(protocol, publicKey);
	}
}
