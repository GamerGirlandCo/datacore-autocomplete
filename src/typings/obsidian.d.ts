import "obsidian";
declare module "obsidian" {
	interface App {
		plugins: {
			enablePlugin: (id: string) => Promise<boolean>;
			disablePlugin: (id: string) => Promise<boolean>;
			enabledPlugins: Set<string>;
		};
	}
}
