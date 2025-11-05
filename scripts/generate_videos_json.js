// Scan thumbs/ and clips/ and build vaultfootage-v3/data/videos.json
// Pair by basename (supercar-01.jpg ↔ supercar-01.mp4). Non-matching files are ignored.
import { readdirSync, writeFileSync, statSync } from "fs";
import { join, basename, extname } from "path";

const ROOT = "vaultfootage-v3";
const THUMBS = join(ROOT, "thumbs");
const CLIPS  = join(ROOT, "clips");
const OUT    = join(ROOT, "data", "videos.json");

function exists(p){ try { return statSync(p).isFile(); } catch { return false; } }

const thumbs = readdirSync(THUMBS).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
const clips  = readdirSync(CLIPS).filter(f => /\.(mp4|webm)$/i.test(f));
const clipSet = new Set(clips.map(f => basename(f, extname(f))));

const collections = thumbs.map(f => {
  const id = basename(f, extname(f));
  const hasClip = clipSet.has(id);
  return {
    id,
    title: id.replace(/[-_]/g, " ").replace(/\b\w/g, m => m.toUpperCase()),
    category: id.split("-")[0],
    thumb: `thumbs/${f}`,
    preview: hasClip ? `clips/${id}.mp4` : undefined,
    count: "10+ clips • 4K",
    resolution: "4K"
  };
}).filter(x => x);

writeFileSync(OUT, JSON.stringify(collections, null, 2));
console.log(`Wrote ${collections.length} items → ${OUT}`);
