import { MessageType } from './enums/MessageType';
import { IMessage } from './IMessage';
import { IProtocol } from './protocols/IProtocol';
import { ProtocolV1 } from './protocols/ProtocolV1';
import { ProtocolV2 } from './protocols/ProtocolV2';
import { BasicInfoResponse } from './responses';
import { BitConverter } from './utils/BitConverter';
import { Bytes } from './utils/byteUtils';

export class MessageFactory {
	public static parse(bytes: Bytes): IMessage {
		let index = 0;
		const type = BitConverter.toInt16(bytes, index);
		index += 2;

		if (!(type in MessageType)) {
			throw new Error(`Unknown message type ${type}`);
		}

		const protocolVersion = BitConverter.toInt16(bytes, index);
		index += 2;
		const protocol = MessageFactory.parseProtocol(protocolVersion, bytes);
		index += 8;

		switch (type) {
			case MessageType.BasicInfoResponse:
				return BasicInfoResponse.parse(protocol, bytes.slice(index));
		}

		throw new Error(`Message type ${type} is defined but not yet supported`);
	}

	public static parseProtocol(version: number, bytes: Bytes): IProtocol {
		switch (version) {
			case 1:
				return ProtocolV1.parse(bytes.slice(0, 8));
			case 2:
				return ProtocolV2.parse(bytes.slice(0, 8));

			default:
				throw new Error(`Protocol version ${version} is not supported`);
		}
	}
}
