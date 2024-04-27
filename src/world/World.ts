import { Container, Rectangle } from 'pixi.js';
import { Reel } from './reel/Reel';
import type { Game } from '../Game';
import { ReelEventsE, WorldEventsE } from '../enums';

export class World extends Container {
	private reels: Reel[] = [];
	private reelsContainer: Container = new Container();

	constructor(private app: Game) {
		super();
	}

	public create() {
		const { reels, reelsContainer, app } = this;

		let totalWidth = 0;

		for (let i = 0; i < app.config.reels.length; i++) {
			const reelConfig = app.config.reels[i];

			const reel = new Reel(app, reelConfig);

			reel.position.x = reelConfig.width * i;
			reel.setCurrentSymbolIndex(5);

			totalWidth += reelConfig.width * i;

			reels.push(reel);

			reelsContainer.addChild(reel);
		}

		reelsContainer.pivot.x = totalWidth / 2;

		this.addChild(reelsContainer);
	}

	public startSpin(stopSynbolIndexes: number[]) {
		const { reels } = this;

		let spinnedReels = 0;
		let spinStopEnteredReels = 0;
		let spinStopReels = 0;

		for (let i = 0; i < reels.length; i++) {
			const reel = reels[i];

			reel.once(ReelEventsE.SPIN_START_COMPLETED, () => {
				spinnedReels++;

				if (spinnedReels === reels.length) {
					this.emit(WorldEventsE.ALL_REELS_SPIN_START_COMPLETED);
				}
			});

			reel.once(ReelEventsE.SPIN_STOP_ENTERED, () => {
				spinStopEnteredReels++;

				if (spinStopEnteredReels === reels.length) {
					this.emit(WorldEventsE.ALL_REELS_SPIN_STOP_ENTERED);
				}
			});

			reel.once(ReelEventsE.SPIN_STOP_COMPLETED, () => {
				spinStopReels++;

				if (spinStopReels === reels.length) {
					this.emit(WorldEventsE.ALL_REELS_SPIN_STOP_COMPLETED);
				}
			});

			reel.startSpin(stopSynbolIndexes[i]);
		}
	}

	public playWin(winMatrix: number[][]) {
		const { reels } = this;

		for (let i = 0; i < reels.length; i++) {
			const reel = reels[i];

			reel.playWin(winMatrix[i]);
		}
	}

	public onQuickStop(multiplier: number) {
		const { reels } = this;

		for (let i = 0; i < reels.length; i++) {
			const reel = reels[i];

			reel.onQuickStop(multiplier);
		}
	}

	public onResize(screen: Rectangle) {
		const { reelsContainer } = this;

		reelsContainer.position.set(screen.width / 2, screen.height / 2);
	}
}
