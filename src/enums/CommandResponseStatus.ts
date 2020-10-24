export enum CommandResponseStatus {
	/** Indicates that the command was successful.*/
	Success = 0,

	/**
	 * Message was sent with a wrong signature.
	 * This often means the message structure was invalid.
	 */
	InvalidSignature = 1,

	/** User does not have privileges to execute the command.*/
	ExceedsPrivileges = 2,

	/** Lock is not in a state to execute the command.*/
	InvalidState = 3,

	/** Message has expired, e.g. timestamp is too far in the past.*/
	MessageExpired = 4,

	/** Unknown.*/
	FragmentError = 5,

	/** Unknown.*/
	EnvelopeError = 6,

	/** One of the parameters in the message is not understood.*/
	InvalidParameter = 7,

	/** The protocol was sent with a wrong sequence number.*/
	InvalidSequenceNumber = 8,

	/** Internal failure.*/
	InternalFailure = 9,

	/**
	 * The challenge number of the message was wrong.
	 * Use the challenge number returned by this <see cref="CommandResponseMessage"/>.
	 */
	ChallengeNumberIncorrect = 10,

	/** Message requires challenge response and protocol version 2.*/
	MessageRequiresChallengeResponseAndProtocolVersion2 = 11,

	/** Message not supported in protocol version 2 and requires version 1.*/
	MessageNotSupportedInProtocolVersion2AndRequiresVersion1 = 12,

	/** Too many key IDs for this connection.*/
	TooManyKeyIDsForThisConnection = 13,

	/** Battery on the device is low. No motor operation is allowed.*/
	BatteryLow = 14,

	/** Operation is unsafe, i.e. the lock does not think it is mounted.*/
	UnsafeOperation = 15,

	/** Lock is not calibrated, and therefore unable to lock/unlock.*/
	NotCalibrated = 16,
}
