import { Application, Assets, Container, Graphics, Sprite } from 'pixi.js';
import { ReelConfigT } from '../../types';
import { Symbol } from '../symbols/Symbol';
import { StateMachine } from '../../common/state/StateMachine';
import { ReelState } from './states/ReelState';
import { ReelStateSpinStart } from './states/ReelStateSpinStart';
import { ReelStateSpinning } from './states/ReelStateSpinning';
import { ReelStateE } from '../../enums';
import { ReelStateSpinStop } from './states/ReelStateSpinStop';
import { WinFrame } from './WinFrame';

export class Reel extends Container {
	readonly symbolsContainer: Container = new Container();
	readonly symbolsContainerUnmasked: Container = new Container();
	readonly symbols: Symbol[] = [];
	readonly winFrames: WinFrame[] = [];

	public lastSymbolsUpPositionY: number = 0;

	public currentSymbolKeyIndex: number = 0;

	private _speedMultiplier: number = 1;

	public get speedMultiplier() {
		return this._speedMultiplier;
	}

	private _stopSymbolIndex: number = null;

	public get stopSymbolIndex() {
		return this._stopSymbolIndex;
	}

	readonly stateMachine: StateMachine<ReelStateE> = new StateMachine(this, {
		[ReelStateE.IDLE]: ReelState,
		[ReelStateE.SPIN_START]: ReelStateSpinStart,
		[ReelStateE.SPINNING]: ReelStateSpinning,
		[ReelStateE.SPIN_STOP]: ReelStateSpinStop,
	});

	constructor(private app: Application, readonly config: ReelConfigT) {
		super();

		app.ticker.add(this.stateMachine.update, this.stateMachine);

		this.create();
	}

	protected create() {
		const {
			config,
			symbols,
			symbolsContainer,
			symbolsContainerUnmasked,
			winFrames,
		} = this;

		const graphicsMask = new Graphics();

		graphicsMask.rect(
			-config.mask_width / 2,
			-config.mask_height / 2,
			config.mask_width,
			config.mask_height
		);
		graphicsMask.fill();

		symbolsContainer.mask = graphicsMask;

		const background = new Sprite(Assets.get('reel_bg'));

		background.anchor.set(0.5);

		this.addChild(background);

		const totalVisibleSymbols = config.visible_symbols + 2;

		const pivotY =
			(config.symbol_height * (config.visible_symbols + 1)) / 2;

		for (let i = 0; i < totalVisibleSymbols; i++) {
			const symbol = new Symbol();

			symbol.y = config.symbol_height * i - pivotY;

			symbolsContainer.addChild(symbol);

			symbols.push(symbol);
		}

		for (let i = 0; i < config.visible_symbols; i++) {
			const winFrame = new WinFrame();

			winFrame.y =
				config.symbol_height * i - pivotY + config.symbol_height;

			winFrames.push(winFrame);

			this.addChild(winFrame);
		}

		this.addChild(symbolsContainer, symbolsContainerUnmasked, graphicsMask);
	}

	public setCurrentSymbolIndex(value: number) {
		const { symbols, config } = this;

		this.currentSymbolKeyIndex = value - 1;

		if (this.currentSymbolKeyIndex === -1) {
			this.currentSymbolKeyIndex = config.symbols.length - 1;
		}

		value = this.currentSymbolKeyIndex;

		for (let i = 0; i < symbols.length; i++) {
			const symbol = symbols[i];

			symbol.setKey(config.symbols[value]);

			value++;

			if (value === config.symbols.length) {
				value = 0;
			}
		}
	}

	public startSpin(stopSymbolIndex: number) {
		const { stateMachine } = this;

		this._speedMultiplier = 1;
		this._stopSymbolIndex = stopSymbolIndex;

		stateMachine.setState(ReelStateE.SPIN_START);
	}

	public playWin(winMatrix: number[]) {
		const { symbols, winFrames, symbolsContainerUnmasked } = this;

		for (let i = 0; i < winMatrix.length; i++) {
			if (winMatrix[i]) {
				symbolsContainerUnmasked.addChild(symbols[i + 1]);
				symbols[i + 1].playWin();

				winFrames[i].playShow();
			}
		}
	}

	public onQuickStop(multiplier: number) {
		this._speedMultiplier = multiplier;
	}
}
