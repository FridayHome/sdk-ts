import { ProtocolV2 } from '../src';
import { ProtocolV1 } from '../src/protocols/ProtocolV1';
import { Bytes } from '../src/utils/byteUtils';
import { fromLockUnoTime } from '../src/utils/timing';

describe('Protocol V1', () => {
	test('equality', () => {
		const a = new ProtocolV1(3, fromLockUnoTime(5000));
		const b = new ProtocolV1(3, fromLockUnoTime(5000));

		expect(a).toEqual(b);
	});

	test.each([
		[new ProtocolV1(), [0, 0, 0, 0, 1, 0, 0, 0]],
		[new ProtocolV1(5, fromLockUnoTime(7)), [7, 0, 0, 0, 5, 0, 0, 0]],
	])('toBytes', (protocol: ProtocolV1, bytes: Bytes) => {
		expect(protocol.toBytes()).toEqual(bytes);
	});
});

describe('Protocol V2', () => {
	test('equality', () => {
		const a = new ProtocolV2(4, [1, 2, 3, 4, 5, 6]);
		const b = new ProtocolV2(4, [1, 2, 3, 4, 5, 6]);

		expect(a).toEqual(b);
	});

	test.each([[[]], [[1, 2, 3, 4, 5]], [[1234567]]])(
		'challenge must be of length 6',
		(challenge: Bytes) => {
			expect(() => new ProtocolV2(0, challenge)).toThrowError(
				'Challenge must be of length 6'
			);
		}
	);

	test.each([
		[new ProtocolV2(5, [1, 2, 3, 4, 5, 6]), [5, 0, 1, 2, 3, 4, 5, 6]],
		[new ProtocolV2(256, [83, 42, 13, 193, 121, 245]), [0, 1, 83, 42, 13, 193, 121, 245]],
	])('toBytes', (protocol: ProtocolV2, bytes: Bytes) => {
		expect(protocol.toBytes()).toEqual(bytes);
	});
});
