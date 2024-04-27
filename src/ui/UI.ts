import { Assets, Container, Rectangle, Text } from 'pixi.js';
import { Button } from './Button';
import { WinPopup } from './WinPopup';

export class UI extends Container {
	private _spinButton: Button = null;

	public get spinButton() {
		return this._spinButton;
	}

	private _winPopup: WinPopup = null;

	public get winPopup() {
		return this._winPopup;
	}

	private balanceText: Text = null;

	public create() {
		this._spinButton = new Button(
			Assets.get('play_button'),
			Assets.get('play_button_disabled')
		);

		this.balanceText = new Text({
			text: '100$',
			anchor: 0.5,
			style: {
				fill: 0xffffff,
				fontSize: 50,
			},
		});

		this._winPopup = new WinPopup();

		const { spinButton, balanceText, winPopup } = this;

		this.addChild(spinButton, balanceText, winPopup);
	}

	public updateBalance(value: number) {
		const { balanceText } = this;

		balanceText.text = value + '$';
	}

	public onResize(screen: Rectangle) {
		const { spinButton, balanceText, winPopup } = this;

		winPopup.position.set(screen.right - 200, screen.height / 2);

		spinButton.position.set(screen.right - 200, screen.bottom - 200);
		balanceText.position.set(screen.right - 200, screen.top + 200);
	}
}
