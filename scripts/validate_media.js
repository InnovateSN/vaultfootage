// scripts/validate_media.js
import { readFileSync, statSync } from "fs";
import { join } from "path";

const ROOT = "vaultfootage-v3";
const OUT_FILE = join(ROOT, "data", "videos.json");

function isFile(p){ try { return statSync(p).isFile(); } catch { return false; } }

const data = JSON.parse(readFileSync(OUT_FILE, "utf8"));
if (!Array.isArray(data) || data.length === 0) {
  console.error("videos.json empty or invalid");
  process.exit(1);
}

let ok = true;
for (const it of data) {
  const t = join(ROOT, it.thumb || "");
  if (!it.thumb || !isFile(t)) { console.error("Missing thumb:", it.id, it.thumb); ok = false; }
  if (it.preview) {
    const p = join(ROOT, it.preview);
    if (!isFile(p)) { console.error("Missing preview:", it.id, it.preview); ok = false; }
  }
}
if (!ok) process.exit(1);
console.log("Media validation OK:", data.length, "items");
