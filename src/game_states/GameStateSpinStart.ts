import { GameStateE, WorldEventsE } from '../enums';
import { GameState } from './GameState';

export class GameStateSpinStart extends GameState {
	public async onEnter() {
		const { world, ui, config, stateMachine, spinController } = this.parent;

		ui.winPopup.playHide();

		ui.spinButton.enabled = false;

		world.once(WorldEventsE.ALL_REELS_SPIN_START_COMPLETED, () => {
			stateMachine.setState(GameStateE.SPINNING);
		});

		this.parent.lastSpinResult = await spinController.getSpinResult();

		this.parent.balance -= config.bet;

		ui.updateBalance(this.parent.balance);

		world.startSpin(this.parent.lastSpinResult.stopSymbolIndexes);
	}
}
