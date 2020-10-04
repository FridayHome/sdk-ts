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
