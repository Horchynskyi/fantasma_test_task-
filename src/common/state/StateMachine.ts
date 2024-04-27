import { Ticker } from 'pixi.js';
import { State } from './State';

export class StateMachine<KeyT extends string | number | symbol> {
	private states: Partial<Record<KeyT, State>> = {};

	private currentState: State = null;

	constructor(
		parent: any,
		stateClasses: Record<KeyT, new (...args: any[]) => State>
	) {
		const { states } = this;

		for (const key in stateClasses) {
			const state = new stateClasses[key](parent);

			states[key] = state;
		}
	}

	public setState(key: KeyT) {
		const { states } = this;

		this.currentState?.onExit();

		this.currentState = states[key];

		this.currentState.onEnter();
	}

	public update(ticker: Ticker) {
		const { currentState } = this;

		currentState?.update(ticker);
	}
}
