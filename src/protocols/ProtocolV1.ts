import { BitConverter } from '../utils/BitConverter';
import { Bytes } from '../utils/byteUtils';
import { dateToBytes, lockUnoEpoch } from '../utils/timing';
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

	toBytes(): Bytes {
		return dateToBytes(this.timestamp).concat(
			BitConverter.getBytes(this.sequenceNumber, 2),
			[0, 0] // Reserved values
		);
	}
}
