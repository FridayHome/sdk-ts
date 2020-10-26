import {
	parseManufacturerData,
	Advertisement,
	AdvertisementFlag,
} from '../src/advertisement';
import { DeviceType } from '../src/enums/DeviceType';

describe('Advertisement', () => {
	test.each([
		[
			Uint8Array.from([26, 4, 184, 142, 211, 105, 2, 7, 0]),
			{
				isFriday: true,
				manufacturerId: 'B88ED369',
				flag: AdvertisementFlag.TimeInvalid,
				state: 7,
				type: DeviceType.Uno,
			} as Advertisement,
		],
		[
			Uint8Array.from([26, 4, 62, 213, 156, 3, 1, 0, 4, 32]),
			{
				isFriday: true,
				flag: AdvertisementFlag.SetupAllowed,
				manufacturerId: '3ED59C03',
				state: 1024,
				type: DeviceType.Duo,
			},
		],
		[Uint8Array.from([]), undefined],
		[undefined, undefined],
	])('parse', (advertisementData, expected) => {
		expect(parseManufacturerData(advertisementData)).toEqual(expected);
	});
});
