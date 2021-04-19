import { ConfigurationStep } from '../enums/ConfigurationStep';
import { MessageType } from '../enums/MessageType';
import { Message } from '../Message';
import { IProtocol } from '../protocols/IProtocol';
import { BitConverter } from '../utils/BitConverter';

export class ConfigurationStepMessage extends Message {
	configurationStep: ConfigurationStep;

	constructor(protocol: IProtocol, configurationStep: ConfigurationStep) {
		super(MessageType.ConfigurationStep, protocol);
		this.configurationStep = configurationStep;
	}

	public createBody(): Uint8Array {
		return BitConverter.getBytes(this.configurationStep, 2);
	}
}
