import { SlotGameConfig, SpinResult, WinResultT } from './types';

export class SpinController {
	constructor(readonly config: SlotGameConfig) {}

	public async getSpinResult(): Promise<SpinResult> {
		const { config } = this;

		const result: SpinResult = {
			stopSymbolIndexes: [],
		};

		for (let i = 0; i < config.reels.length; i++) {
			const stopIndex = Math.floor(
				Math.random() * config.reels[i].symbols.length
			);

			result.stopSymbolIndexes.push(stopIndex);
		}

		const win = this.getWin(result.stopSymbolIndexes);

		if (win) {
			Object.assign(result, win);
		}

		return result;
	}

	private getWin(stopIndexes: number[]): WinResultT | null {
		const { config } = this;

		let winMatrix = null;
		let totalWinSymbols = null;

		// Checking if symbols fit any win matrix
		outerLoop: for (let i = 0; i < config.winMatrixes.length; i++) {
			let symbolKey: string = null;
			let winSymbols = 1;

			for (let j = 0; j < config.winMatrixes[i].length; j++) {
				const reelWinMatrix = config.winMatrixes[i][j];

				for (let z = 0; z < reelWinMatrix.length; z++) {
					if (reelWinMatrix[z]) {
						if (
							symbolKey &&
							symbolKey ===
								config.reels[j].symbols[stopIndexes[j] + z]
						) {
							winSymbols++;
						} else if (symbolKey === null) {
							symbolKey =
								config.reels[j].symbols[stopIndexes[j] + z];
						} else {
							continue outerLoop;
						}
					}
				}
			}

			winMatrix = config.winMatrixes[i];
			totalWinSymbols = winSymbols;

			break;
		}

		if (winMatrix) {
			return {
				win: totalWinSymbols * config.bet,
				winMatrix,
			};
		}

		return null;
	}
}
