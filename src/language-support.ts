import { Remote, wrap } from "comlink";
import { WorkerShape } from "@valtown/codemirror-ts/worker";
import DatacoreAutocomplete from "main";

export async function useAutoCompleteWorker(this: DatacoreAutocomplete) {
	const wrapped = await wrap<WorkerShape>(this.worker);
	await wrapped.initialize();
	return wrapped;
}
