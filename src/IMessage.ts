import { IMessageHeader } from './header/IMessageHeader';
import { Bytes } from './utils/byteUtils';

export interface IMessage {
  /**
   * Header for the message.
   */
  header: IMessageHeader;

  /**
   * Convert the message to a byte array.
   */
  toBytes(): Bytes;
}