// minimal fallback that only writes from current thumbs/clips pairing
import { readdirSync, writeFileSync, statSync } from "fs";
import { join, basename, extname } from "path";

const ROOT = "vaultfootage-v3";
const THUMBS = join(ROOT, "thumbs");
const CLIPS  = join(ROOT, "clips");
const OUT    = join(ROOT, "data", "videos.json");

function exists(p){ try { return statSync(p).isFile(); } catch { return false; } }

const thumbs = readdirSync(THUMBS).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
const clips  = new Set(readdirSync(CLIPS).map(f => basename(f, extname(f))));

const items = thumbs.map(f => {
  const id = basename(f, extname(f));
  const hasClip = clips.has(id);
  return {
    id,
    title: id.replace(/[-_]/g, " ").replace(/\b\w/g, m => m.toUpperCase()),
    category: id.split("-")[0],
    thumb: `thumbs/${f}`,
    preview: hasClip ? `clips/${id}.mp4` : undefined,
    count: "10+ clips • 4K",
    resolution: "4K"
  };
});

writeFileSync(OUT, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items → ${OUT}`);
