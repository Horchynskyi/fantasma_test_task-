import { Game } from './Game';
import * as TWEEN from '@tweenjs/tween.js';

(async () => {
	const game = new Game();

	await game.init();

	document.body.appendChild(game.canvas);

	await game.loadResources();

	game.ticker.add(() => {
		TWEEN.update(performance.now());
	});

	game.create();
})();
