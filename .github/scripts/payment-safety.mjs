import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../../app.js", import.meta.url), "utf8");

assert.match(source, /body\.environment!=="sandbox"/, "checkout must reject every non-sandbox API configuration");
assert.match(source, /https:\/\/www\.sandbox\.paypal\.com\/sdk\/js/, "checkout must load only the PayPal sandbox SDK");
assert.match(source, /Sandbox checkout — no real charge will be made\./, "checkout must identify sandbox behavior");
assert.doesNotMatch(source, /https:\/\/www\.paypal\.com\/sdk\/js/, "production PayPal SDK URL is forbidden");
assert.doesNotMatch(source, /environment==="live"|\["sandbox","live"\]|Live checkout/, "live checkout branches are forbidden");

console.log("Payment safety verified: public checkout is sandbox-only.");
