"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDefine = buildDefine;
const fs_1 = require("fs");
function buildDefine(scriptVersion) {
    const env = Object.fromEntries(Object.entries(loadEnvironment()).map(([key, value]) => [key, JSON.stringify(value === "true")]));
    return { ...env, SCRIPT_VERSION: JSON.stringify(scriptVersion) };
}
function loadEnvironment() {
    const file = (0, fs_1.existsSync)(".env") ? ".env" : ".env.example";
    const entries = (0, fs_1.readFileSync)(file, "utf8").split("\n").filter(line => line.includes("="));
    return Object.fromEntries(entries.map(line => line.trim().split("=")));
}
