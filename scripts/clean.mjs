import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");

const targets = [
	path.join(root, "dist"),
	path.join(root, "src-tauri", "target"),
	path.join(root, "node_modules", ".vite"),
];

const rimraf = (p) => {
	try {
		fs.rmSync(p, { recursive: true, force: true });
		// eslint-disable-next-line no-console
		console.log(`Removed: ${p}`);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.warn(`Failed to remove ${p}: ${e?.message ?? String(e)}`);
	}
};

for (const p of targets) rimraf(p);
