import { LockState, LockOperation, MessageType } from '../enums';
import { Message } from '../Message';
import { IProtocol } from '../protocols/IProtocol';
import { BitConverter } from '../utils/BitConverter';

export class LockStateResponse extends Message {
	currentState: LockState;
	lastOperation: LockOperation;
	stateNumber: number;
	constructor(
		protocol: IProtocol,
		currentState: LockState,
		lastOperation: LockOperation,
		stateNumber: number
	) {
		super(MessageType.LockStateResponse, protocol);
		this.currentState = currentState;
		this.lastOperation = lastOperation;
		this.stateNumber = stateNumber;
	}

	public createBody(): Uint8Array {
		throw new Error('Method not implemented.');
	}

	public static parse(
		protocol: IProtocol,
		bytes: Uint8Array
	): LockStateResponse {
		const currentState = BitConverter.toNumber(bytes, 1, 0);
		const lastOperation = BitConverter.toNumber(bytes, 1, 1);
		const stateNumber = BitConverter.toNumber(bytes, 2, 2);

		return new LockStateResponse(
			protocol,
			currentState,
			lastOperation,
			stateNumber
		);
	}
}
