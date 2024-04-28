import { GameStateE, WorldEventsE } from '../enums';
import { GameState } from './GameState';

export class GameStateShowWin extends GameState {
	public onEnter(): void {
		const { world, ui, lastSpinResult } = this.parent;

		world.playWin(lastSpinResult.winMatrix);

		this.parent.balance += lastSpinResult.win;

		ui.winPopup.setWin(lastSpinResult.win);
		ui.winPopup.playShow();

		ui.updateBalance(this.parent.balance);

		ui.spinButton.enabled = true;

		ui.spinButton.once('pointerdown', this.onSpinButtonpointerDown, this);
	}

	public onExit(): void {
		const { ui } = this.parent;

		ui.spinButton.off('pointerdown', this.onSpinButtonpointerDown, this);
	}

	private onSpinButtonpointerDown() {
		const { stateMachine, ui } = this.parent;

		ui.spinButton.enabled = false;

		stateMachine.setState(GameStateE.SPIN_START);
	}
}
