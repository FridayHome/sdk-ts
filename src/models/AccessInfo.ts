import {
	KeyKind,
	PrivilegeKind,
	RecurringKind,
	RestrictionKind,
} from '../enums';

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

	getFlags(): number {
		return parseInt(
			`${this.privilege}${this.key}${this.restriction}${this.recurrence}`
		);
	}
}
