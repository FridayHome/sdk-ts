import { ProtocolV2 } from '../../src';
import { LockOperation } from '../../src/enums/LockOperation';
import { LockUnlockStateMessage } from '../../src/requests/LockUnlockStateMessage';

describe('Lock unlock state message', () => {
	test('create', () => {
		var message = new LockUnlockStateMessage(
			new ProtocolV2(0),
			LockOperation.Unlock,
			new Date(Date.UTC(2020, 0, 1, 0, 0, 0))
		);
		const expected = Uint8Array.from([0x2, 0x0, 0x53, 0x67, 0x09]);

		expect(message.createBody()).toEqual(expected);
	});
});
