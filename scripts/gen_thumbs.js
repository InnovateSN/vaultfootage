// scripts/gen_thumbs.js (ESM)
// Generate thumbnails from MP4s in vaultfootage-v3/clips → vaultfootage-v3/thumbs
import { readdirSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { spawnSync } from "child_process";
import { join, basename, extname } from "path";

const ROOT = "vaultfootage-v3";
const CLIPS = join(ROOT, "clips");
const THUMBS = join(ROOT, "thumbs");
const OUTJSON = join(ROOT, "data", "videos.json");

// ensure dirs
if (!existsSync(CLIPS)) mkdirSync(CLIPS, { recursive: true });
if (!existsSync(THUMBS)) mkdirSync(THUMBS, { recursive: true });

// get duration via ffprobe
function getDuration(file) {
  const p = spawnSync("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    file
  ], { encoding: "utf8" });
  const sec = parseFloat((p.stdout || "0").trim());
  return Number.isFinite(sec) && sec > 0 ? sec : 5;
}

// make one thumbnail at mid time
function makeThumb(srcMp4, dstJpg) {
  const dur = getDuration(srcMp4);
  const t = Math.max(1, Math.floor(dur / 2)); // middle-ish
  const args = [
    "-y",
    "-ss", `${t}`,
    "-i", srcMp4,
    "-vframes", "1",
    "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
    dstJpg
  ];
  const res = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (res.status !== 0) throw new Error(`ffmpeg failed for ${srcMp4}`);
}

// scan clips and generate thumbs
const clips = readdirSync(CLIPS).filter(f => /\.(mp4|webm)$/i.test(f));
const items = [];
for (const f of clips) {
  const id = basename(f, extname(f));
  const src = join(CLIPS, f);
  const thumbPath = join(THUMBS, `${id}.jpg`);
  if (!existsSync(thumbPath)) {
    console.log(`→ thumb ${id}.jpg`);
    makeThumb(src, thumbPath);
  } else {
    console.log(`✓ thumb exists ${id}.jpg`);
  }
  items.push({
    id,
    title: id.replace(/[-_]/g, " ").replace(/\b\w/g, m => m.toUpperCase()),
    category: id.split("-")[0],
    thumb: `thumbs/${id}.jpg`,
    preview: `clips/${id}${extname(f)}`,
    count: "10+ clips • 4K",
    resolution: "4K"
  });
}

// write videos.json (sorted by id)
items.sort((a,b)=>a.id.localeCompare(b.id));
writeFileSync(OUTJSON, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items → ${OUTJSON}`);
