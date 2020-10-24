import { CommandResponse, MessageType, ProtocolV2 } from '../../src';
import { CommandResponseStatus } from '../../src/enums/CommandResponseStatus';

describe('Parsing command response', () => {
	test('parsing', () => {
		var protocol = new ProtocolV2(
			0xaaaa,
			Uint8Array.from([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc])
		);

		const bytes = Uint8Array.from([
			0,
			0x02,
			0,
			0x53,
			0x67,
			0x09,
			0xa9,
			0xaa,
			0,
			0,
		]);

		const response = CommandResponse.parse(protocol, bytes);
		expect(response).toEqual(
			new CommandResponse(
				protocol,
				MessageType.ChallengeRequest,
				new Date(Date.UTC(2020, 0, 1, 0, 0, 0)),
				0xaaa9,
				CommandResponseStatus.Success
			)
		);
	});
});
