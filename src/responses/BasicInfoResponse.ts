import { Message } from '../Message';
import { Bytes } from '../utils/byteUtils';

export class BasicInfoResponse extends Message {
	protected createBody(): Bytes {
		throw new Error('Method not implemented.');
	}
}
