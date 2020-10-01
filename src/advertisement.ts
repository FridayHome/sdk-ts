import { BitConverter, bytesToHex } from './utils/byteUtils';

export const FridayCompanyId = 0x041a;

export interface Advertisement {
	isFriday: boolean;
	manufacturerId: string;
	flag: AdvertisementFlag;
	state: number;
}

export enum AdvertisementFlag {
	NoFlag = 0,
	SetupAllowed = 0x01,
	TimeInvalid = 0x02,
	ServerNeeded = 0x04,
	BatteryLow = 0x08,
	WiFiError = 0x10,
}

export function parseManufacturerData(data: number[]): Advertisement {
	return {
		isFriday: BitConverter.toShort(data) === FridayCompanyId,
		manufacturerId: bytesToHex(data.slice(2, 6)),
		flag: data[6],
		state: BitConverter.toShort(data, 7),
	};
}
