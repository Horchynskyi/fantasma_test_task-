import { Sprite, Texture } from 'pixi.js';

export class Button extends Sprite {
	private _enabled: boolean = true;

	public get enabled() {
		return this._enabled;
	}

	public set enabled(value: boolean) {
		this._enabled = value;

		this.texture = value ? this.enabledTexture : this.disabledTexture;

		if (value) {
			this.eventMode = 'static';
			this.cursor = 'pointer';
		} else {
			this.eventMode = 'none';
			this.cursor = 'none';
		}
	}

	constructor(
		public enabledTexture: Texture,
		public disabledTexture: Texture
	) {
		super(enabledTexture);

		this.anchor.set(0.5);
	}
}
