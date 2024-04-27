import type { Game } from '../Game';
import { State } from '../common/state/State';

export class GameState extends State<Game> {
	protected spinSpeedMultiplier: number = 1;
}
