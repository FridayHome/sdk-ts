

export interface IProtocol {
  Version: ProtocolVersion;

  /**
   * @returns the byte representation of this protocol
   */
	toBytes(): Uint8Array;
}

export type ProtocolVersion = 1 | 2;
