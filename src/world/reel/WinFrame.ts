import { Easing, Tween } from '@tweenjs/tween.js';
import { Assets, Sprite } from 'pixi.js';

export class WinFrame extends Sprite {
	private animationTW: Tween<any> = null;

	constructor() {
		super(Assets.get('win_bg'));

		this.anchor.set(0.5);
		this.alpha = 0;
		this.visible = false;
	}

	public playShow() {
		if (this.visible) {
			return;
		}

		this.animationTW?.stop();

		this.visible = true;

		this.animationTW = new Tween(this)
			.to(
				{
					alpha: 1,
				},
				250
			)
			.easing(Easing.Circular.Out)
			.start();
	}

	public playHide() {
		if (!this.visible) {
			return;
		}

		this.animationTW?.stop();

		this.animationTW = new Tween(this)
			.to(
				{
					alpha: 0,
				},
				150
			)
			.easing(Easing.Circular.In)
			.start()
			.onComplete(() => {
				this.visible = false;
			});
	}
}
