import { BitConverter, Bytes } from './byteUtils';

export const lockUnoEpoch = new Date(Date.UTC(2015, 0, 1, 0, 0, 0, 0));
export const lockUnoMaxTime = fromLockUnoTime(0xffff_ffff);

/**
 * Converts a date into a time understood by the Friday Uno lock.
 * Time for the lock is calculated as the seconds since `lockUnoEpoch`
 *
 * @param date to convert to lock time
 * @returns Number of seconds since `lockUnoEpoch`
 */
export function toLockUnoTime(date: Date): number {
	return Math.floor((date.getTime() - lockUnoEpoch.getTime()) / 1000);
}

/**
 * Converts time from the lock (in seconds) to a date.
 *
 * @param time in the lock.
 * @returns the given time as a Date object
 */
export function fromLockUnoTime(time: number): Date {
	return new Date(1000 * time + lockUnoEpoch.getTime());
}

/**
 * @param date to convert to bytes
 * @returns the given data as bytes
 */
export function dateToBytes(date: Date): Bytes {
	return BitConverter.getBytes(toLockUnoTime(date));
}
