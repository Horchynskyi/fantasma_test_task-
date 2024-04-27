import { Easing, Tween } from '@tweenjs/tween.js';
import { ReelState } from './ReelState';
import { ReelEventsE, ReelStateE } from '../../../enums';
import { Ticker } from 'pixi.js';

export class ReelStateSpinStart extends ReelState {
	public onEnter(): void {
		const {
			symbolsContainer,
			symbolsContainerUnmasked,
			config,
			stateMachine,
			symbols,
			winFrames,
		} = this.parent;

		for (let i = 1; i < symbols.length - 1; i++) {
			const symbol = symbols[i];

			if (symbolsContainerUnmasked.children.length) {
				symbolsContainer.addChild(...symbolsContainerUnmasked.children);
			}

			symbol.playIdle();
		}

		for (let i = 0; i < winFrames.length; i++) {
			const symbol = winFrames[i];

			symbol.playHide();
		}

		new Tween(symbolsContainer)
			.to(
				{
					y: config.visible_symbols * config.symbol_height,
				},
				config.spin_start_duration
			)
			.easing(Easing.Back.In)
			.start()
			.onComplete(() => {
				stateMachine.setState(ReelStateE.SPINNING);

				this.parent.emit(ReelEventsE.SPIN_START_COMPLETED);
			});
	}

	public update(ticker: Ticker): void {
		this.manageSymbols();
	}
}
