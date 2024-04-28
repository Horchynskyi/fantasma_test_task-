import { GameStateE, WorldEventsE } from '../enums';
import { GameState } from './GameState';

export class GameStateSpinStop extends GameState {
	public onEnter(): void {
		const { world, ui, stateMachine, lastSpinResult } = this.parent;

		world.once(WorldEventsE.ALL_REELS_SPIN_STOP_COMPLETED, () => {
			stateMachine.setState(
				lastSpinResult.win ? GameStateE.SHOW_WIN : GameStateE.IDLE
			);
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
