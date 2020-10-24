import { Message } from '../Message';
import { IProtocol } from '../protocols/IProtocol';
import { fromLockUnoTime } from '../utils/timing';
import { BitConverter } from '../utils/BitConverter';
import { MessageType } from '../enums/MessageType';
import { CommandResponseStatus } from '../enums/CommandResponseStatus';

export class CommandResponse extends Message {
	respondedTo: MessageType;
	timestampRespondedTo: Date;
	sequenceNumberRespondedTo: number;
	status: CommandResponseStatus;

	constructor(
		protocol: IProtocol,
		respondedTo: MessageType,
		timestampRespondedTo: Date,
		sequenceRespondedTo: number,
		status: CommandResponseStatus
	) {
		super(MessageType.CommandResponse, protocol);
		this.respondedTo = respondedTo;
		this.timestampRespondedTo = timestampRespondedTo;
		this.sequenceNumberRespondedTo = sequenceRespondedTo;
		this.status = status;
	}

	public createBody(): Uint8Array {
		throw new Error('Method not implemented.');
	}

	public static parse(protocol: IProtocol, data: Uint8Array): CommandResponse {
		const responseToType = BitConverter.toInt16(data, 0);
		const timestampRespondedTo = fromLockUnoTime(BitConverter.toInt32(data, 2));
		const sequenceRespondedTo = BitConverter.toInt16(data, 6);
		const status = BitConverter.toInt16(data, 8);

		return new CommandResponse(
			protocol,
			responseToType,
			timestampRespondedTo,
			sequenceRespondedTo,
			status
		);
	}
}
