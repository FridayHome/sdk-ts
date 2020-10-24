import { fromLockUnoTime, ProtocolV1, ProtocolV2 } from '../src';
import { MessageHeader } from '../src/header/MessageHeader';
import { MessageType } from '../src/enums/MessageType';

describe('Message header', () => {
	test.each([
		[
			new MessageHeader(
				MessageType.CommandResponse,
				new ProtocolV1(5, fromLockUnoTime(7))
			),
			Uint8Array.from([
				0x01,
				0x00,
				0x01,
				0x00,
				0x07,
				0x00,
				0x00,
				0x00,
				0x05,
				0x00,
				0x00,
				0x00,
			]),
		],
		[
			new MessageHeader(
				MessageType.LockUnlockCommand,
				new ProtocolV2(
					0x1234,
					Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x91, 0x23])
				)
			),
			Uint8Array.from([
				0x09,
				0x00,
				0x02,
				0x00,
				0x34,
				0x12,
				0x12,
				0x34,
				0x56,
				0x78,
				0x91,
				0x23,
			]),
		],
	])('toBytes', (header: MessageHeader, bytes: Uint8Array) => {
		expect(header.toBytes()).toEqual(bytes);
	});
});
