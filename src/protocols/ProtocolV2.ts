import { BitConverter } from '../utils/BitConverter';
import { bytesConcat } from '../utils/byteUtils';
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
	challenge: Uint8Array;

	constructor(
		sequenceNumber = 1,
		challenge: Uint8Array = Uint8Array.from([0, 0, 0, 0, 0, 0])
	) {
		if (challenge.length !== ChallengeLength) {
			throw new Error(`Challenge must be of length ${ChallengeLength}`);
		}
		this.sequenceNumber = sequenceNumber;
		this.challenge = challenge;
	}

	toBytes(): Uint8Array {
		return bytesConcat(
			BitConverter.getBytes(this.sequenceNumber, 2),
			this.challenge
		);
	}

	static parse(bytes: Uint8Array): ProtocolV2 {
		if (bytes.length !== 8) {
			throw new Error(`Uint8Array must be length 8 to be a protocol V2`);
		}

		return new ProtocolV2(BitConverter.toInt16(bytes), bytes.slice(2));
	}
}
