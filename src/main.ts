import { Plugin } from "obsidian";
import autocompleteWorker from "autocomplete.worker";
import { useAutoCompleteWorker } from "language-support";
import { Extension } from "@codemirror/state";
import {
	tsAutocompleteWorker,
	tsFacetWorker,
	tsHoverWorker,
	tsLinterWorker,
	tsSyncWorker,
} from "@valtown/codemirror-ts";
import { autocompletion } from "@codemirror/autocomplete";

export default class DatacoreAutocomplete extends Plugin {
	worker: Worker;
	#extensions: Extension[];

	async onload() {
		this.worker = new autocompleteWorker();
		await this.waitForDatacore();
		this.#extensions = [
			tsLinterWorker(),
			tsSyncWorker(),
			tsHoverWorker(),
			autocompletion({override: [tsAutocompleteWorker()]}),
			tsFacetWorker.of({worker: await this.useAutocomplete(), path: "script.tsx"})
		];
	}
	async waitForDatacore() {
		await this.app.plugins.enablePlugin("datacore")	
	}
	get extensions() {
		return [...this.#extensions, ];
	}

	onunload() {
		this.worker.terminate();
	}

	get useAutocomplete() {
		return useAutoCompleteWorker.bind(this);
	}
}
