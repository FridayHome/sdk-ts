import { BitConverter, bytesToHex } from '../src';

describe('Array conversion tests', () => {
	test.each([
		[[1, 0], 1],
		[[0, 1], 256],
		[[1, 1], 257],
		[[255, 255], 65535],
		[[0, 4], 1024],
		[[26, 4], 1050],
	])('to short', (bytes, expected) => {
		expect(BitConverter.toShort(bytes)).toBe(expected);
	});

	test.each([
		[[255], 'FF'],
		[[255, 255], 'FFFF'],
		[[1, 0], '0100'],
		[[26, 4], '1A04'],
	])('byte to hex', (array, hex) => {
		expect(bytesToHex(array)).toBe(hex);
	});
});
