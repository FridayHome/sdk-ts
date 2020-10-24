import { ProtocolV2 } from '../src';
import { ProtocolV1 } from '../src/protocols/ProtocolV1';

import { fromLockUnoTime } from '../src/utils/timing';

describe('Protocol V1', () => {
	test('equality', () => {
		const a = new ProtocolV1(3, fromLockUnoTime(5000));
		const b = new ProtocolV1(3, fromLockUnoTime(5000));

		expect(a).toEqual(b);
	});

	test.each([
		[new ProtocolV1(), Uint8Array.from([0, 0, 0, 0, 1, 0, 0, 0])],
		[
			new ProtocolV1(5, fromLockUnoTime(7)),
			Uint8Array.from([7, 0, 0, 0, 5, 0, 0, 0]),
		],
	])('toBytes', (protocol: ProtocolV1, bytes: Uint8Array) => {
		expect(protocol.toBytes()).toEqual(bytes);
	});

	test.each([
		[Uint8Array.from([0, 0, 0, 0, 1, 0, 0, 0]), new ProtocolV1()],
		[
			Uint8Array.from([7, 0, 0, 0, 5, 0, 0, 0]),
			new ProtocolV1(5, fromLockUnoTime(7)),
		],
	])('parse', (bytes: Uint8Array, protocol: ProtocolV1) => {
		expect(ProtocolV1.parse(bytes)).toEqual(protocol);
	});
});

describe('Protocol V2', () => {
	test('equality', () => {
		const a = new ProtocolV2(4, Uint8Array.from([1, 2, 3, 4, 5, 6]));
		const b = new ProtocolV2(4, Uint8Array.from([1, 2, 3, 4, 5, 6]));

		expect(a).toEqual(b);
	});

	test.each([[[]], [[1, 2, 3, 4, 5]], [[1234567]]])(
		'challenge must be of length 6',
		(challenge: number[]) => {
			expect(() => new ProtocolV2(0, Uint8Array.from(challenge))).toThrowError(
				'Challenge must be of length 6'
			);
		}
	);

	test.each([
		[
			new ProtocolV2(5, Uint8Array.from([1, 2, 3, 4, 5, 6])),
			Uint8Array.from([5, 0, 1, 2, 3, 4, 5, 6]),
		],
		[
			new ProtocolV2(256, Uint8Array.from([83, 42, 13, 193, 121, 245])),
			Uint8Array.from([0, 1, 83, 42, 13, 193, 121, 245]),
		],
	])('toBytes', (protocol: ProtocolV2, bytes: Uint8Array) => {
		expect(protocol.toBytes()).toEqual(bytes);
	});

	test.each([
		[
			Uint8Array.from([5, 0, 1, 2, 3, 4, 5, 6]),
			new ProtocolV2(5, Uint8Array.from([1, 2, 3, 4, 5, 6])),
		],
		[
			Uint8Array.from([0, 1, 83, 42, 13, 193, 121, 245]),
			new ProtocolV2(256, Uint8Array.from([83, 42, 13, 193, 121, 245])),
		],
	])('parse', (bytes: Uint8Array, protocol: ProtocolV2) => {
		expect(ProtocolV2.parse(bytes)).toEqual(protocol);
	});
});
