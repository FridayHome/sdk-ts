import { BitConverter } from '../utils/BitConverter';
import { Bytes } from '../utils/byteUtils';
import { IProtocol, ProtocolVersion } from './IProtocol';

const ChallengeLength = 6;

/**
 * Represents a protocol that can be used to send messages
 * to the Friday Lock.
 *
 * Consists of 8 bytes:
 * - 2 bytes sequence number
 * - 6 bytes challenge
 */
export class ProtocolV2 implements IProtocol {
	Version: ProtocolVersion = 2;

	sequenceNumber: number;
	challenge: Bytes;

	constructor(sequenceNumber = 1, challenge: Bytes = [0, 0, 0, 0, 0, 0]) {
		if (challenge.length !== ChallengeLength) {
			throw new Error(`Challenge must be of length ${ChallengeLength}`);
		}
		this.sequenceNumber = sequenceNumber;
		this.challenge = challenge;
	}

	toBytes(): Bytes {
		return BitConverter.getBytes(this.sequenceNumber, 2).concat(this.challenge);
	}

	static parse(bytes: Bytes): ProtocolV2 {
		if (bytes.length !== 8) {
			throw new Error(`Bytes must be length 8 to be a protocol V2`);
		}

		return new ProtocolV2(BitConverter.toInt16(bytes), bytes.slice(2));
	}
}
