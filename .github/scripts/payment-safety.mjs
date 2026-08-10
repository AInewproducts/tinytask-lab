import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../../app.js", import.meta.url), "utf8");

assert.match(source, /body\.environment!=="sandbox"/, "checkout must reject every non-sandbox API configuration");
assert.match(source, /https:\/\/www\.sandbox\.paypal\.com\/sdk\/js/, "checkout must load only the PayPal sandbox SDK");
assert.match(source, /Sandbox checkout — no real charge will be made\./, "checkout must identify sandbox behavior");
assert.doesNotMatch(source, /https:\/\/www\.paypal\.com\/sdk\/js/, "production PayPal SDK URL is forbidden");
assert.doesNotMatch(source, /environment==="live"|\["sandbox","live"\]|Live checkout/, "live checkout branches are forbidden");
assert.match(source, /if\(!\/\^https\?:\$\/\.test\(url\.protocol\)\)throw Error\("Use an http or https destination URL\."\)/, "UTM builder must reject non-web URL schemes");
assert.match(source, /\(sourceWidth\*sourceHeight\+outputWidth\*outputHeight\)\*4>160\*1024\*1024/, "image tools must cap the combined decoded RGBA working set");

console.log("Public safety verified: checkout is sandbox-only, UTM URLs are HTTP(S)-only, and image memory is capped.");
