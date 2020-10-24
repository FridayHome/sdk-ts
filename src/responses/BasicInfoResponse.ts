import { MessageType } from '../enums/MessageType';
import { Message } from '../Message';
import { IProtocol } from '../protocols/IProtocol';
import { BitConverter } from '../utils/BitConverter';


export class BasicInfoResponse extends Message {
	softdevice: number;
	application: number;
	bootloader: number;
	wifi: number;
	hardware: number;
	publicKey: Uint8Array;
	battery: number;

	constructor(
		protocol: IProtocol,
		softdevice: number,
		application: number,
		bootloader: number,
		wifi: number,
		hardware: number,
		battery: number,
		publicKey: Uint8Array
	) {
		super(MessageType.BasicInfoResponse, protocol);
		this.softdevice = softdevice;
		this.application = application;
		this.bootloader = bootloader;
		this.wifi = wifi;
		this.hardware = hardware;
		this.battery = battery;
		this.publicKey = publicKey;
	}

	public createBody(): Uint8Array {
		throw new Error('Method not implemented.');
	}

	public static parse(protocol: IProtocol, bytes: Uint8Array): BasicInfoResponse {
		let index = 0;
		const publicKey = bytes.slice(0, 32);
		index += 32;

		const softdevice = BitConverter.toInt32(bytes, index);
		index += 4;
		const application = BitConverter.toInt32(bytes, index);
		index += 4;
		const bootloader = BitConverter.toInt32(bytes, index);
		index += 4;
		const hardware = BitConverter.toInt32(bytes, index);
		index += 4;

		index += 16; // Ignore empty UUID
		index += 4; // Ignore empty time
		const battery = BitConverter.toInt32(bytes, index);
		index += 4;
		const wifi = BitConverter.toInt32(bytes, index);
		index += 4;

		return new BasicInfoResponse(
			protocol,
			softdevice,
			application,
			bootloader,
			wifi,
			hardware,
			battery,
			publicKey
		);
	}
}
