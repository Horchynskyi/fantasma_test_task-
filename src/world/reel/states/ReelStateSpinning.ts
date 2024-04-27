import { ReelStateE } from '../../../enums';
import { ReelState } from './ReelState';
import { Ticker } from 'pixi.js';

export class ReelStateSpinning extends ReelState {
	private currentSpinningTime: number = 0;

	public onEnter(): void {
		this.currentSpinningTime = 0;
	}

	public update(ticker: Ticker): void {
		const { stateMachine, speedMultiplier, symbolsContainer, config } =
			this.parent;

		symbolsContainer.y +=
			config.spinning_animation_speed *
			ticker.deltaTime *
			speedMultiplier;

		this.manageSymbols();

		this.currentSpinningTime += ticker.deltaMS * speedMultiplier;

		if (this.currentSpinningTime >= config.spinning_duration) {
			stateMachine.setState(ReelStateE.SPIN_STOP);
		}
	}
}
