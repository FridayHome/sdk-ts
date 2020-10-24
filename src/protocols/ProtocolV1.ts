import { BitConverter } from '../utils/BitConverter';
import { bytesConcat } from '../utils/byteUtils';

import {
	dateToBytes,
	fromLockUnoTime,
	lockUnoEpoch,
} from '../utils/timing';
import { IProtocol, ProtocolVersion } from './IProtocol';

/**
 * Represents a protocol that can be used to send messages to the
 * Friday Lock.
 *
 * Protocol V1 consist of 8 bytes:
 * - 4 bytes for timestamp
 * - 2 bytes for sequence number
 * - 2 bytes are reserved for future use
 */
export class ProtocolV1 implements IProtocol {
	Version: ProtocolVersion = 1;

	timestamp: Date;
	sequenceNumber: number;

	constructor(sequenceNumber = 1, timestamp: Date = lockUnoEpoch) {
		this.timestamp = timestamp;
		this.sequenceNumber = sequenceNumber;
	}

	toBytes(): Uint8Array {
		return bytesConcat(
			dateToBytes(this.timestamp),
			BitConverter.getBytes(this.sequenceNumber, 2),
			Uint8Array.from([0, 0]) // Reserved values
		);
	}

	static parse(bytes: Uint8Array): ProtocolV1 {
		if (bytes.length !== 8) {
			throw new Error('Uint8Array are the wrong length to be a ProtocolV1');
		}

		return new ProtocolV1(
			BitConverter.toInt16(bytes, 4),
			fromLockUnoTime(BitConverter.toInt32(bytes))
		);
	}
}
