export type KeyID = number;

export enum KnownKeyIDs {
	Zero = 0,
	NoKeyID = 0xffff,
	SetupCodeKeyID = 0xfffe,
	HomeKitEnterSetup = 0xfffd,
	ServerKey = 50,
	MaxServerKeyID = 99,
}
