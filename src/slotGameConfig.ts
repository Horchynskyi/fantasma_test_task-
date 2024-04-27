import { SlotGameConfig } from './types';

const reelsSymbols = [
	[
		'SYM01',
		'SYM05',
		'SYM01',
		'SYM03',
		'SYM04',
		'SYM03',
		'SYM02',
		'SYM04',
		'SYM03',
		'SYM06',
		'SYM03',
		'SYM01',
		'SYM06',
		'SYM01',
		'SYM02',
		'SYM01',
		'SYM02',
		'SYM02',
		'SYM02',
		'SYM01',
		'SYM02',
		'SYM01',
		'SYM04',
		'SYM01',
		'SYM03',
		'SYM06',
		'SYM01',
		'SYM03',
		'SYM02',
		'SYM05',
		'SYM03',
		'SYM01',
		'SYM02',
		'SYM02',
		'SYM02',
		'SYM01',
		'SYM04',
		'SYM01',
		'SYM04',
		'SYM01',
		'SYM03',
		'SYM02',
		'SYM04',
		'SYM04',
		'SYM05',
		'SYM02',
		'SYM03',
		'SYM01',
		'SYM01',
		'SYM01',
		'SYM04',
		'SYM05',
		'SYM02',
		'SYM02',
		'SYM02',
		'SYM01',
		'SYM05',
		'SYM06',
		'SYM01',
		'SYM03',
		'SYM04',
		'SYM02',
		'SYM05',
		'SYM02',
		'SYM01',
		'SYM05',
		'SYM01',
		'SYM02',
		'SYM01',
		'SYM01',
		'SYM01',
		'SYM04',
		'SYM04',
		'SYM03',
		'SYM03',
		'SYM05',
		'SYM05',
		'SYM04',
		'SYM02',
		'SYM05',
		'SYM02',
		'SYM01',
		'SYM03',
		'SYM02',
		'SYM03',
		'SYM01',
		'SYM04',
		'SYM03',
		'SYM04',
		'SYM02',
		'SYM03',
		'SYM04',
		'SYM01',
		'SYM01',
		'SYM01',
		'SYM02',
		'SYM06',
		'SYM03',
		'SYM02',
		'SYM03',
		'SYM01',
		'SYM05',
	],
];

// Commented 2 reels test
export const slotGameConfig: SlotGameConfig = {
	bet: 1,
	reels: [
		{
			visible_symbols: 3,
			mask_width: 130,
			mask_height: 386,
			width: 140,
			height: 396,
			spinning_animation_speed: 40,
			symbol_height: 128,
			spin_stop_duration: 1000,
			spin_start_duration: 500,
			symbols: reelsSymbols[0],
			spinning_duration: 1500,
		},
		// {
		// 	visible_symbols: 3,
		// 	mask_width: 130,
		// 	mask_height: 386,
		// 	width: 140,
		// 	height: 396,
		// 	spinning_animation_speed: 40,
		// 	symbol_height: 128,
		// 	spin_stop_duration: 1000,
		// 	spin_start_duration: 500,
		// 	symbols: reelsSymbols[0],
		// 	spinning_duration: 1500,
		// },
	],
	// prettier-ignore
	winMatrixes: [
		[
			[
				1, 
				1, 
				1
			],
			// [
			// 	1, 
			// 	1, 
			// 	1
			// ]
		],
		[
			[
				1, 
				1, 
				0
			],
			// [
			// 	1, 
			// 	1, 
			// 	0
			// ]
		],
		[
			[
				0, 
				1, 
				1
			],
			// [
			// 	0, 
			// 	1, 
			// 	1
			// ]
		],
		[
			[
				1, 
				0, 
				1
			],
			// [
			// 	1, 
			// 	0, 
			// 	1
			// ]
		],
	],
};
