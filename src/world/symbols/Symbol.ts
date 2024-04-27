import { Easing, Tween } from '@tweenjs/tween.js';
import { Assets, Container, Sprite } from 'pixi.js';

export class Symbol extends Container {
	private view: Sprite = null;
	private winTw: Tween<any> = null;

	constructor() {
		super();

		this.create();
	}

	protected create() {
		this.view = new Sprite();

		const { view } = this;

		view.anchor.set(0.5);

		this.addChild(view);
	}

	public setKey(key: string) {
		const { view } = this;

		view.texture = Assets.get(key);
	}

	public playWin() {
		this.winTw = new Tween(this.scale)
			.to(
				{
					x: 1.2,
					y: 1.2,
				},
				500
			)
			.easing(Easing.Back.Out)
			.yoyo(true)
			.repeatDelay(250)
			.repeat(Infinity)
			.start();
	}

	public playIdle() {
		const { winTw, scale } = this;

		winTw?.stop();

		scale.set(1);
	}
}
