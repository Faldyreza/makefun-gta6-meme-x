// GTA 6 meme X v2 — entrypoint.
// Copies POST.json (the URL of the X post that IS the entry) from the bot
// directory into the output directory, after checking the URL is a real
// X post link. Node 22, standard library only.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(botDir, "POST.json");

// Validate the post URL before copying anything: it must point at a single
// post on x.com (or twitter.com) — /<user>/status/<digits>. A homepage or
// profile URL would pass a host-only check but make the entry unreadable.
const raw = readFileSync(src, "utf8");
const data = JSON.parse(raw);
const url = data.url;
const post = typeof url === "string"
  ? url.match(/^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/(\d+)([/?#]|$)/)
  : null;
if (!post) {
  throw new Error(`POST.json url must be an https://x.com/ post URL, got: ${url}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "POST.json"));
