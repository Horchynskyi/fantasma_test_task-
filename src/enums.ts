export enum GameStateE {
	IDLE,
	SPIN_START,
	SPINNING,
	SPIN_STOP,
}

export enum ReelStateE {
	IDLE,
	SPIN_START,
	SPINNING,
	SPIN_STOP,
}

export enum ReelEventsE {
	SPIN_START_COMPLETED = 'SPIN_START_COMPLETED',
	SPIN_STOP_ENTERED = 'SPIN_STOP_ENTERED',
	SPIN_STOP_COMPLETED = 'SPIN_STOP_COMPLETED',
}

export enum WorldEventsE {
	ALL_REELS_SPIN_START_COMPLETED = 'ALL_REELS_SPIN_START_COMPLETED',
	ALL_REELS_SPIN_STOP_ENTERED = 'ALL_REELS_SPIN_STOP_ENTERED',
	ALL_REELS_SPIN_STOP_COMPLETED = 'ALL_REELS_SPIN_STOP_COMPLETED',
}