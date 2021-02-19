import { Message } from '../Message';
import { MessageType } from '../enums/MessageType';
import { IProtocol } from '../protocols/IProtocol';

export class LockStateRequest extends Message {
	constructor(protocol: IProtocol) {
		super(MessageType.LockStateRequest, protocol);
  }

  public createBody(): Uint8Array {
		return new Uint8Array();
  }

}