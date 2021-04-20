import { BitConverter } from '../utils/BitConverter';
import {
	KeyKind,
	PrivilegeKind,
	RecurringKind,
	RestrictionKind,
} from '../enums';
import { bytesConcat } from '../utils/byteUtils';

export class AccessInfo {
	privilege: PrivilegeKind;
	key: KeyKind;
	restriction: RestrictionKind;
	recurrence: RecurringKind;

	constructor(
		key: KeyKind,
		privilege: PrivilegeKind,
		recurrence: RecurringKind,
		restriction: RestrictionKind
	) {
		this.privilege = privilege;
		this.key = key;
		this.restriction = restriction;
		this.recurrence = recurrence;
	}

	getFlags(): Uint8Array {
		return bytesConcat(
			BitConverter.getBytes(this.privilege, 1),
			BitConverter.getBytes(this.key, 1),
			BitConverter.getBytes(this.restriction, 1),
			BitConverter.getBytes(this.recurrence, 1)
		);
	}
}
