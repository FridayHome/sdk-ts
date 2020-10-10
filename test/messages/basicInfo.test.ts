import { BasicInfoRequest, fromLockUnoTime, ProtocolV1 } from '../../src';

describe('Basic info request', () => {
	test('create request', () => {
		expect(
			new BasicInfoRequest(new ProtocolV1(0, fromLockUnoTime(0))).toBytes()
		).toEqual([131, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	});
});

describe('Basic info response', () => {

});
