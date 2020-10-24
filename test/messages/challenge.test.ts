import { ProtocolV2 } from '../../src';
import { ChallengeRequest } from '../../src/requests/ChallengeRequest';

describe('Challenge request', () => {
	test('create request', () => {
		expect(
			new ChallengeRequest(
				new ProtocolV2(0, Uint8Array.from([1, 2, 3, 4, 5, 6]))
			).toBytes()
		).toEqual(Uint8Array.from([0, 2, 2, 0, 0, 0, 1, 2, 3, 4, 5, 6]));
	});
});
