import { IMessageHeader } from './header/IMessageHeader';

export interface IMessage {
	/**
	 * Header for the message.
	 */
	header: IMessageHeader;

	/**
	 * Convert the message to a byte array.
	 */
	toBytes(): Uint8Array;
}
