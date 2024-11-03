import { createDefaultMapFromCDN, createSystem, createVirtualTypeScriptEnvironment } from "@typescript/vfs";
import { createWorker } from "@valtown/codemirror-ts/worker";
import * as cl from "comlink";
import ts from "typescript";
import { CompilerOptions } from "typescript";

cl.expose(
    createWorker(async function () {
        const fsMap = await createDefaultMapFromCDN({ target: ts.ScriptTarget.ES2022 }, "5.4.2", false, ts);
        const system = createSystem(fsMap);
        const compilerOpts: CompilerOptions = {
            lib: ["dom", "es5", "scripthost", "es2018", "DOM.Iterable"],
						allowJs: true,
						checkJs: true,
						jsx: ts.JsxEmit.ReactJSX,
						esModuleInterop: true,
						noImplicitAny: false,
        };
        return createVirtualTypeScriptEnvironment(system, [], ts, compilerOpts);
    })
);
