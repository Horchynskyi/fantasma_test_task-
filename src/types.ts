export type ReelConfigT = {
	visible_symbols: number;
	width: number;
	height: number;
	spin_stop_duration: number;
	spin_start_duration: number;
	spinning_animation_speed: number;
	symbol_height: number;
	symbols: string[];
	spinning_duration: number;
	mask_width: number;
	mask_height: number;
};

export type WinResultT = {
	win: number;
	winMatrix: number[][];
};

export type SpinResult = {
	stopSymbolIndexes: number[];
} & Partial<WinResultT>;

export type SlotGameConfig = {
	bet: number;
	reels: ReelConfigT[];
	winMatrixes: number[][][];
};
