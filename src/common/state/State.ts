import { Ticker } from 'pixi.js';

export class State<ParentT = any> {
	constructor(protected parent: ParentT) {}

	public onEnter() {}

	public onExit() {}

	public update(ticker: Ticker) {}
}
