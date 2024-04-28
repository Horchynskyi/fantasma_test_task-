import { ReelState } from './ReelState';
import { Ticker } from 'pixi.js';
import { Easing } from '@tweenjs/tween.js';
import { ReelEventsE, ReelStateE } from '../../../enums';

export class ReelStateSpinStop extends ReelState {
	private startPositionY: number = 0;
	private endPositionY: number = 0;
	private currentDuration: number = 0;

	public onEnter(): void {
		const {
			symbolsContainer,
			config,
			lastSymbolsUpPositionY,
			stopSymbolIndex,
		} = this.parent;

		let symbolIndex =
			(stopSymbolIndex + config.visible_symbols + 2) %
			config.symbols.length;

		this.parent.setCurrentSymbolIndex(symbolIndex);

		this.parent.emit(ReelEventsE.SPIN_STOP_ENTERED);

		this.startPositionY = symbolsContainer.y;
		this.endPositionY =
			lastSymbolsUpPositionY +
			(config.visible_symbols + 2) * config.symbol_height -
			symbolsContainer.y;

		this.currentDuration = config.spin_stop_duration;
	}

	public onExit(): void {
		const { parent } = this;
		const { config, stopSymbolIndex } = parent;

		parent.symbolsContainer.y = 0;

		const pivotY =
			(config.symbol_height * (config.visible_symbols + 1)) / 2;

		for (let i = 0; i < parent.symbols.length; i++) {
			const symbol = parent.symbols[i];

			symbol.y = config.symbol_height * i - pivotY;
		}

		parent.setCurrentSymbolIndex(stopSymbolIndex);
	}

	public update(ticker: Ticker): void {
		this.manageSymbols();

		const { speedMultiplier, config, symbolsContainer, stateMachine } =
			this.parent;

		this.currentDuration -= ticker.deltaMS * speedMultiplier;

		let progress = 1 - this.currentDuration / config.spin_stop_duration;

		if (progress >= 1) {
			progress = 1;
		}

		symbolsContainer.y =
			this.startPositionY + this.endPositionY * Easing.Back.Out(progress);

		if (progress === 1) {
			this.parent.emit(ReelEventsE.SPIN_STOP_COMPLETED);

			stateMachine.setState(ReelStateE.IDLE);
		}
	}
}
