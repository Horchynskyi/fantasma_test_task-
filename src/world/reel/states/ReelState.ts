import { State } from '../../../common/state/State';
import { Reel } from '../Reel';

export class ReelState extends State<Reel> {
	protected manageSymbols() {
		const { parent } = this;
		const { symbolsContainer, config, symbols } = parent;

		const currentContainerY =
			symbolsContainer.y - parent.lastSymbolsUpPositionY;

		const moveSymbolsToTop = Math.floor(
			currentContainerY / config.symbol_height
		);

		if (moveSymbolsToTop) {
			parent.lastSymbolsUpPositionY =
				symbolsContainer.y -
				(symbolsContainer.y % config.symbol_height);

			for (let i = 0; i < moveSymbolsToTop; i++) {
				const lastSymbol = symbols.pop();
				const firstSymbol = symbols[0];

				lastSymbol.y = firstSymbol.y - config.symbol_height;

				symbols.unshift(lastSymbol);

				parent.currentSymbolKeyIndex--;

				if (parent.currentSymbolKeyIndex === -1) {
					parent.currentSymbolKeyIndex = config.symbols.length - 1;
				}

				lastSymbol.setKey(config.symbols[parent.currentSymbolKeyIndex]);
			}
		}
	}
}
