import { Application, Assets, Sprite } from 'pixi.js';
import { resourcesPathes } from './resources';
import { World } from './world/World';
import { UI } from './ui/UI';
import { ResizeManager } from './ResizeManager';
import { GameStateE } from './enums';
import { StateMachine } from './common/state/StateMachine';
import { GameStateIdle } from './game_states/GameStateIdle';
import { GameStateSpinStart } from './game_states/GameStateSpinStart';
import { GameStateSpinning } from './game_states/GameStateSpinning';
import { GameStateSpinStop } from './game_states/GameStateSpinStop';
import { SpinController } from './SpinController';
import { slotGameConfig } from './slotGameConfig';
import { SpinResult } from './types';
import { GameStateShowWin } from './game_states/GameStateShowWin';

export class Game extends Application {
	readonly world: World = null;
	readonly ui: UI = null;
	private resizeManager: ResizeManager = null;

	readonly stateMachine: StateMachine<GameStateE> = new StateMachine(this, {
		[GameStateE.IDLE]: GameStateIdle,
		[GameStateE.SPIN_START]: GameStateSpinStart,
		[GameStateE.SPINNING]: GameStateSpinning,
		[GameStateE.SPIN_STOP]: GameStateSpinStop,
		[GameStateE.SHOW_WIN]: GameStateShowWin,
	});

	readonly config = slotGameConfig;

	readonly spinController = new SpinController(this.config);

	public lastSpinResult: SpinResult = null;
	public balance: number = 100;

	constructor() {
		super();
		this.world = new World(this);
		this.ui = new UI();
	}

	public async loadResources() {
		for (const key in resourcesPathes.images) {
			Assets.add({
				alias: key,
				src: resourcesPathes.images[key],
			});
		}

		await Assets.load(Object.keys(resourcesPathes.images));
	}

	public create() {
		this.resizeManager = new ResizeManager(this);

		const { world, ui, stateMachine, resizeManager, ticker } = this;

		world.create();
		ui.create();

		this.stage.addChild(world, ui);

		resizeManager.on('resize', this.onResize, this);

		resizeManager.onResize();
		ticker.add(stateMachine.update, stateMachine);

		stateMachine.setState(GameStateE.IDLE);
	}

	private onResize() {
		const { world, ui, screen } = this;

		world.onResize(screen);
		ui.onResize(screen);
	}
}
