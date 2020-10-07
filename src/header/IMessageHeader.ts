import { MessageType } from '../MessageType';
import { IProtocol } from '../protocols/IProtocol';
import { Bytes } from '../utils/byteUtils';

/**
 * Header used to indicating which message is being sent to the
 * Friday Lock.
 */
export interface IMessageHeader {
	messageType: MessageType;
	protocol: IProtocol;

	toBytes(): Bytes;
}
