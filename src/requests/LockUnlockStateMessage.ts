import { LockOperation } from '../enums/LockOperation';
import { MessageType } from '../enums/MessageType';
import { Message } from '../Message';
import { IProtocol } from '../protocols/IProtocol';
import { BitConverter } from '../utils/BitConverter';
import { bytesConcat } from '../utils/byteUtils';
import { dateToBytes } from '../utils/timing';

export class LockUnlockStateMessage extends Message {
	validTo: Date;
	operation: LockOperation;

	constructor(
		protocol: IProtocol,
		operation: LockOperation,
		validTo: Date | undefined = undefined
	) {
		super(MessageType.LockUnlockCommand, protocol);
		this.operation = operation;
		this.validTo = validTo ?? new Date(Date.now());
	}

	public createBody(): Uint8Array {
		return bytesConcat(
			BitConverter.getBytes(this.operation, 1),
			dateToBytes(this.validTo)
		);
	}
}
