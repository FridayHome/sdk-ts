import { Bytes } from '../utils/byteUtils';
import { IProtocol, ProtocolVersion } from './IProtocol';

export class ProtocolV2 implements IProtocol {
  Version: ProtocolVersion = 2;

	toBytes(): Bytes {
		throw new Error('Method not implemented.');
	}
}
