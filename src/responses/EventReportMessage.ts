import { Message } from '../Message';
import { MessageType } from '../enums/MessageType';
import { EventStatus } from '../enums/EventStatus';
import { IProtocol } from '../protocols/IProtocol';
import { BitConverter } from '../utils/BitConverter';

export class EventReportMessage extends Message {
	responseTo: MessageType;
	status: EventStatus;

	constructor(
		protocol: IProtocol,
		responseTo: MessageType,
		status: EventStatus
	) {
		super(MessageType.EventReport, protocol);
		this.responseTo = responseTo;
		this.status = status;
	}

	public createBody(): Uint8Array {
		throw new Error('Method not implemented.');
	}

	public static parse(
		protocol: IProtocol,
		data: Uint8Array
	): EventReportMessage {
		const responseTo = BitConverter.toInt16(data, 0);
		const status = BitConverter.toInt16(data, 2);

		return new EventReportMessage(protocol, responseTo, status);
	}
}
