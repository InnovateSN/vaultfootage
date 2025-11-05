// scripts/generate_videos_json.js
import { readdirSync, writeFileSync, statSync, readFileSync } from "fs";
import { join, basename, extname } from "path";

const ROOT = "vaultfootage-v3";
const THUMBS_DIR = join(ROOT, "thumbs");
const CLIPS_DIR  = join(ROOT, "clips");
const OUT_DIR    = join(ROOT, "data");
const OUT_FILE   = join(OUT_DIR, "videos.json");
const CONFIG_FILE = join(ROOT, "media.config.json");

function isFile(p){ try { return statSync(p).isFile(); } catch { return false; } }
function safeReadJSON(p){
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}

const cfg = safeReadJSON(CONFIG_FILE) || {
  // opzionale: mapping { id: { title, category, count, resolution } }
  // oppure rules by prefix: { "supercar": { category:"Supercar", count:"15+ clips • 4K" } }
  byId: {},
  byPrefix: {}
};

const thumbs = (readdirSync(THUMBS_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)));
const clips  = (readdirSync(CLIPS_DIR).filter(f => /\.(mp4|webm)$/i.test(f)));
const clipSet = new Set(clips.map(f => basename(f, extname(f))));

function titleCase(s){
  return s.replace(/[-_]+/g, " ").replace(/\b\w/g, m => m.toUpperCase());
}

function metaFor(id){
  const fromId = cfg.byId?.[id] || {};
  const prefix = id.split("-")[0];
  const fromPrefix = cfg.byPrefix?.[prefix] || {};
  const category = fromId.category || fromPrefix.category || titleCase(prefix);
  const title    = fromId.title    || titleCase(id);
  const count    = fromId.count    || fromPrefix.count || "10+ clips • 4K";
  const res      = fromId.resolution|| fromPrefix.resolution || "4K";
  return { category, title, count, resolution: res };
}

const items = thumbs.map(f => {
  const id = basename(f, extname(f));
  const thumbRel = `thumbs/${f}`;
  if (!isFile(join(THUMBS_DIR, f))) return null;

  const hasClip = clipSet.has(id);
  const previewRel = hasClip ? `clips/${id}.mp4` : undefined;

  const meta = metaFor(id);
  return {
    id,
    title: meta.title,
    category: meta.category,
    thumb: thumbRel,            // NO leading slash
    ...(previewRel ? { preview: previewRel } : {}),
    count: meta.count,
    resolution: meta.resolution
  };
}).filter(Boolean);

// sort: category ASC, then id ASC
items.sort((a, b) => (a.category || "").localeCompare(b.category || "") || a.id.localeCompare(b.id));

// write
writeFileSync(OUT_FILE, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items → ${OUT_FILE}`);
