import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);

const jobs = process.env.CARGO_BUILD_JOBS || process.env.CARGO_JOBS || "2";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");

const binName = process.platform === "win32" ? "tauri.CMD" : "tauri";
const tauriBin = path.resolve(root, "node_modules", ".bin", binName);

const child = spawn(tauriBin, args, {
	cwd: root,
	stdio: "inherit",
	shell: process.platform === "win32",
	env: {
		...process.env,
		CARGO_BUILD_JOBS: jobs,
	},
});

child.on("exit", (code) => {
	process.exit(code ?? 1);
});
