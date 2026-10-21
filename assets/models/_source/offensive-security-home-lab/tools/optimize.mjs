// ABOUTME: Shrinks one GLB: material fixes by name, dedup, weld, optional simplify, reorder, quantize and meshopt compression.
// ABOUTME: Usage: node optimize.mjs <in.glb> <out.glb> [simplifyRatio]
import fs from "node:fs";
import zlib from "node:zlib";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, weld, simplify, reorder, meshopt } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptDecoder, MeshoptSimplifier } from "meshoptimizer";

const [inPath, outPath, ratioArg] = process.argv.slice(2);
if (!inPath || !outPath) { console.error("usage: node optimize.mjs <in.glb> <out.glb> [ratio]"); process.exit(2); }
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready, MeshoptSimplifier.ready]);

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "meshopt.decoder": MeshoptDecoder, "meshopt.encoder": MeshoptEncoder
});
const doc = await io.read(inPath);
const root = doc.getRoot();

function stats(d) {
  let tris = 0, prims = 0, verts = 0;
  for (const mesh of d.getRoot().listMeshes()) for (const p of mesh.listPrimitives()) {
    prims++;
    const idx = p.getIndices();
    const pos = p.getAttribute("POSITION");
    verts += pos.getCount();
    tris += (idx ? idx.getCount() : pos.getCount()) / 3;
  }
  return { tris, prims, verts, meshes: d.getRoot().listMeshes().length, nodes: d.getRoot().listNodes().length };
}
const before = stats(doc);

// materials: transparent glass and the perforated front need the right alpha mode in the file
for (const m of root.listMaterials()) {
  const n = m.getName();
  if (/^Glass_/.test(n)) { m.setAlphaMode("BLEND"); m.setDoubleSided(true); }
  if (n === "Mesh_Front") { m.setAlphaMode("MASK"); m.setAlphaCutoff(0.5); m.setDoubleSided(true); }
}

const steps = [dedup(), prune({ keepAttributes: true, keepLeaves: true }), weld({ tolerance: 0.0001 })];
if (ratioArg && Number(ratioArg) < 1) steps.push(simplify({ simplifier: MeshoptSimplifier, ratio: Number(ratioArg), error: 0.002 }));
steps.push(reorder({ encoder: MeshoptEncoder }), meshopt({ encoder: MeshoptEncoder, level: "high" }));
await doc.transform(...steps);
await io.write(outPath, doc);

const after = stats(doc);
const raw = fs.statSync(outPath).size;
const gz = zlib.gzipSync(fs.readFileSync(outPath), { level: 9 }).length;
const rawIn = fs.statSync(inPath).size;
console.log(JSON.stringify({ file: outPath.split(/[\\/]/).pop(), in: { bytes: rawIn, ...before }, out: { bytes: raw, gzip9: gz, ...after } }));
