import { Bytes } from '../utils/byteUtils';

export interface IProtocol {
  Version: ProtocolVersion;

  /**
   * @returns the byte representation of this protocol
   */
	toBytes(): Bytes;
}

export type ProtocolVersion = 1 | 2;
