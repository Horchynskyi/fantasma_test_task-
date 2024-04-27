import { GameStateE, WorldEventsE } from '../enums';
import { GameState } from './GameState';

export class GameStateSpinStop extends GameState {
	public onEnter(): void {
		const { world, ui, stateMachine, lastSpinResult } = this.parent;

		world.once(WorldEventsE.ALL_REELS_SPIN_STOP_COMPLETED, () => {
			if (lastSpinResult.win) {
				world.playWin(lastSpinResult.winMatrix);

				this.parent.balance += lastSpinResult.win;

				ui.winPopup.setWin(lastSpinResult.win);
				ui.winPopup.playShow();

				ui.updateBalance(this.parent.balance);
			}

			stateMachine.setState(GameStateE.IDLE);
		});

		if (ui.spinButton.enabled) {
			ui.spinButton.once(
				'pointerdown',
				this.onSpinButtonpointerDown,
				this
			);
		}
	}

	public onExit(): void {
		const { ui } = this.parent;

		ui.spinButton.off('pointerdown', this.onSpinButtonpointerDown, this);
	}

	private onSpinButtonpointerDown() {
		const { world, ui } = this.parent;

		ui.spinButton.enabled = false;

		this.spinSpeedMultiplier = 3;

		world.onQuickStop(this.spinSpeedMultiplier);
	}
}
