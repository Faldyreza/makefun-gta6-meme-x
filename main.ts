// main.ts — copies POST.json from the repository root into the output
// directory, so the grader can read the submitted X post's address.
// Node 22, standard library only: no network, no clock, no files outside
// the repository. The copy is byte for byte, so repeated runs agree.
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

mkdirSync(outputDir, { recursive: true });
copyFileSync(join(botDir, "POST.json"), join(outputDir, "POST.json"));
