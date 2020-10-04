import { BitConverter, Bytes, bytesToHex } from '../src';

describe('Array conversion tests', () => {
	test.each([
		[[1, 0], 1],
		[[0, 1], 256],
		[[1, 1], 257],
		[[255, 255], 65535],
		[[0, 4], 1024],
		[[26, 4], 1050],
	])('to short', (bytes, expected) => {
		expect(BitConverter.toInt16(bytes)).toBe(expected);
	});

	test.each([
		[[255], 'FF'],
		[[255, 255], 'FFFF'],
		[[1, 0], '0100'],
		[[26, 4], '1A04'],
	])('byte to hex', (array, hex) => {
		expect(bytesToHex(array)).toBe(hex);
	});

	test.each([
		[0, []],
		[255, [255]],
		[256, [0, 1]],
		[0xffff_ffff, [255, 255, 255, 255]],
		[0x1234_5678, [0x78, 0x56, 0x34, 0x12]],
	])('number to bytes', (number: number, bytes: Bytes) => {
		expect(BitConverter.getBytes(number)).toEqual(bytes);
	});

	test.each([[0], [256], [829323]])(
		'number to bytes to number',
		(number: number) => {
			expect(BitConverter.toInt32(BitConverter.getBytes(number))).toEqual(
				number
			);
		}
	);
});
