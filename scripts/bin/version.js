"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveScriptVersion = resolveScriptVersion;
const child_process_1 = require("child_process");
function describe(args) {
    return (0, child_process_1.execFileSync)("git", ["describe", "--tags", ...args], { stdio: ["ignore", "pipe", "ignore"] })
        .toString()
        .trim()
        .replace(/^v/, "");
}
function resolveScriptVersion() {
    try {
        return describe(["--exact-match"]);
    }
    catch {
        try {
            return describe([]);
        }
        catch {
            return "0.0.0-dev";
        }
    }
}
