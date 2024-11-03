declare global {
	const datacore: {
		hooks: typeof import("preact/hooks");
	}	 | undefined
}
export {}
