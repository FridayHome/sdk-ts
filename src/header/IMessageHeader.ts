import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';


/**
 * Header used to indicating which message is being sent to the
 * Friday Lock.
 */
export interface IMessageHeader {
	messageType: MessageType;
	protocol: IProtocol;

	toBytes(): Uint8Array;
}
