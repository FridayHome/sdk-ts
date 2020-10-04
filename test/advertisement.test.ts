import {
	parseManufacturerData,
	Advertisement,
	AdvertisementFlag,
} from '../src/advertisement';

describe('Advertisement', () => {
	test.each([
		[
			[26, 4, 184, 142, 211, 105, 2, 7, 0],
			{
				isFriday: true,
				manufacturerId: 'B88ED369',
				flag: AdvertisementFlag.TimeInvalid,
				state: 7,
			} as Advertisement,
		],
		[[], undefined],
		[undefined, undefined],
	])('parse', (advertisementData, expected) => {
		expect(parseManufacturerData(advertisementData as number[])).toEqual(
			expected
		);
	});
});
