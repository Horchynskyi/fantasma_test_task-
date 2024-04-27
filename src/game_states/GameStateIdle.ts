import { GameStateE } from '../enums';
import { GameState } from './GameState';

export class GameStateIdle extends GameState {
	public onEnter(): void {
		const { ui, balance } = this.parent;

		ui.spinButton.enabled = !!balance;

		ui.spinButton.once('pointerdown', this.onSpinButtonpointerDown, this);
	}

	private onSpinButtonpointerDown() {
		const { stateMachine, ui } = this.parent;

		ui.spinButton.enabled = false;

		stateMachine.setState(GameStateE.SPIN_START);
	}
}
