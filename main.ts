// main.ts — copies POST.json from the repository root into the output
// directory, so the grader can read the submitted X post's address.
// Node 22, standard library only: no network, no clock, no files outside
// the repository. The copy is byte for byte, so repeated runs agree.
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

// Validate the post address before copying, so a missing or malformed
// POST.json fails here with a clear message instead of a bare copy error.
const post = JSON.parse(readFileSync(join(botDir, "POST.json"), "utf8"));
if (typeof post.url !== "string" || !/^https:\/\/(x\.com|twitter\.com)\//.test(post.url)) {
  throw new Error("POST.json must name an https://x.com/ (or twitter.com) post URL");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(join(botDir, "POST.json"), join(outputDir, "POST.json"));
