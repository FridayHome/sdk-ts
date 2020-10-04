import { Bytes } from '../src/utils/byteUtils';
import {
	dateToBytes,
	fromLockUnoTime,
	lockUnoEpoch,
	lockUnoMaxTime,
	toLockUnoTime,
} from '../src/utils/timing';

describe('Timing', () => {
	test('min/epoch time is correct', () => {
		expect(lockUnoEpoch).toEqual(new Date(Date.UTC(2015, 0, 1, 0, 0, 0, 0)));
	});

	test('max time for lock is correct', () => {
		expect(lockUnoMaxTime).toEqual(new Date(Date.UTC(2151, 1, 7, 6, 28, 15)));
	});

	test.each([
		[new Date(Date.UTC(2015, 0, 1, 0, 0, 0, 0)), 0],
		[new Date(Date.UTC(2020, 1, 2, 3, 4, 5)), 160542245],
		[new Date(Date.UTC(2020, 7, 23, 16, 53, 21)), 178131201],
	])('convert date into lock time', (date: Date, lockTime: number) => {
		expect(toLockUnoTime(date)).toBe(lockTime);
	});

	test.each([
		[0, lockUnoEpoch],
		[160542245, new Date(Date.UTC(2020, 1, 2, 3, 4, 5))],
		[178131201, new Date(Date.UTC(2020, 7, 23, 16, 53, 21))],
	])('convert number to date', (time: number, date: Date) => {
		expect(fromLockUnoTime(time)).toEqual(date);
	});

	test.each([[lockUnoEpoch], [new Date(Date.UTC(2019, 8, 19, 3, 1, 16))]])(
		'time identity',
		(date: Date) => {
			expect(fromLockUnoTime(toLockUnoTime(date))).toEqual(date);
		}
	);

	test.each([
		[new Date(Date.UTC(2020, 2, 4, 6, 7, 25)), [0x9d, 0xb7, 0xba, 0x09]],
		[lockUnoEpoch, [0, 0, 0, 0]],
	])('date to bytes', (date: Date, bytes: Bytes) => {
		expect(dateToBytes(date)).toEqual(bytes);
	});
});
