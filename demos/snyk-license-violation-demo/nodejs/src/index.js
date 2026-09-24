/**
 * Demo app: simulates a proprietary SaaS feature stack that embeds GPL tooling.
 * Not for production — used to exercise Snyk license scanning only.
 */

import ffmpegPath from "ffmpeg-static";
import ccnetviz from "ccnetviz";

console.log("Acme Proprietary Video Suite (demo build)");
console.log("Bundled ffmpeg binary path:", ffmpegPath ?? "(not resolved)");
console.log("Network viz module loaded:", typeof ccnetviz === "object" || typeof ccnetviz === "function");
