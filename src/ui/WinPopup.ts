import { Easing, Tween } from '@tweenjs/tween.js';
import { Container, Text } from 'pixi.js';

export class WinPopup extends Container {
	private winAmountText: Text = null;

	private animationTW: Tween<any> = null;

	constructor() {
		super();

		this.winAmountText = new Text({
			text: '100$',
			anchor: 0.5,
			style: {
				fill: 0xffffff,
				fontSize: 100,
				align: 'center',
				dropShadow: {
					blur: 10,
					angle: 0,
					color: '#F6FF33',
					distance: 0,
				},
			},
		});

		const { winAmountText } = this;

		this.addChild(winAmountText);

		this.scale.set(0);
		this.visible = false;
	}

	public setWin(value: number) {
		const { winAmountText } = this;

		winAmountText.text = 'WIN\n' + value + '$';
	}

	public playShow() {
		if (this.visible) {
			return;
		}

		this.animationTW?.stop();

		this.visible = true;

		this.animationTW = new Tween(this.scale)
			.to(
				{
					x: 1,
					y: 1,
				},
				500
			)
			.easing(Easing.Cubic.Out)
			.start();
	}

	public playHide() {
		if (!this.visible) {
			return;
		}

		this.animationTW?.stop();

		this.animationTW = new Tween(this.scale)
			.to(
				{
					x: 0,
					y: 0,
				},
				250
			)
			.easing(Easing.Cubic.In)
			.start()
			.onComplete(() => {
				this.visible = false;
			});
	}
}
