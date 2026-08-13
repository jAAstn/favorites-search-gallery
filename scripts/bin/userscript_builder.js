"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_1 = require("esbuild");
const fs_1 = require("fs");
const path_1 = require("path");
const raw_ts_plugin_1 = require("./raw_ts_plugin");
const SCRIPT_VERSION = "1.22";
function loadEnv() {
    const file = (0, fs_1.existsSync)(".env") ? ".env" : ".env.example";
    const entries = (0, fs_1.readFileSync)(file, "utf8").split("\n").filter(line => line.includes("="));
    return Object.fromEntries(entries.map(line => line.trim().split("=")));
}
function buildDefine() {
    const env = Object.fromEntries(Object.entries(loadEnv()).map(([key, value]) => [key, JSON.stringify(value === "true")]));
    return { ...env, SCRIPT_VERSION: JSON.stringify(SCRIPT_VERSION) };
}
const OUT_FILE = "dist/favorites_search_gallery.user.js";
const USERSCRIPT_HEADER = `// ==UserScript==
// @name         Rule34 Favorites Search Gallery
// @namespace    bruh3396
// @version      ${SCRIPT_VERSION}
// @description  Search, View, and Play Rule34 Favorites (Desktop/Android/iOS)
// @author       bruh3396
// @compatible   Chrome
// @compatible   Edge
// @compatible   Firefox
// @compatible   Safari
// @compatible   Opera
// @match        https://rule34.xxx/index.php?page=favorites&s=view&id=*
// @match        https://rule34.xxx/index.php?page=post&s=list*
// @grant        none

// ==/UserScript==`;
const BUILD_OPTIONS = {
    entryPoints: ["src/app/favorites_search_gallery.ts"],
    bundle: true,
    metafile: true,
    outfile: OUT_FILE,
    format: "iife",
    target: ["esnext"],
    legalComments: "none",
    alias: {
        "@": (0, path_1.resolve)("src")
    },
    banner: {
        js: USERSCRIPT_HEADER
    },
    define: buildDefine(),
    plugins: [raw_ts_plugin_1.rawTsPlugin],
    loader: {
        ".svg": "text",
        ".css": "text",
        ".html": "text"
    }
};
async function buildUserscript() {
    const result = await (0, esbuild_1.build)(BUILD_OPTIONS);
    const content = (0, fs_1.readFileSync)(OUT_FILE, "utf8");
    const contentWithoutSourceComments = content.replace(/^\s*\/\/\s*(?:src|ts-raw).*\n/gm, "");
    const crlfContent = contentWithoutSourceComments.replace(/\r?\n/g, "\r\n");
    (0, fs_1.writeFileSync)(OUT_FILE, crlfContent, "utf8");
    (0, fs_1.writeFileSync)("dist/meta.json", JSON.stringify(result.metafile, null, 2), "utf8");
    console.log("✔ Build completed.");
}
buildUserscript();
