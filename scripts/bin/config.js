"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILD_OPTIONS = exports.META_FILE = exports.OUT_FILE = void 0;
const define_1 = require("./define");
const header_1 = require("./header");
const minify_vendor_plugin_1 = require("./minify_vendor_plugin");
const raw_ts_plugin_1 = require("./raw_ts_plugin");
const path_1 = require("path");
const version_1 = require("./version");
const SCRIPT_VERSION = (0, version_1.resolveScriptVersion)();
exports.OUT_FILE = "dist/favorites_search_gallery.js";
exports.META_FILE = "dist/meta.json";
exports.BUILD_OPTIONS = {
    entryPoints: ["src/app/favorites_search_gallery.ts"],
    bundle: true,
    metafile: true,
    outfile: exports.OUT_FILE,
    format: "iife",
    target: ["esnext"],
    legalComments: "none",
    alias: {
        "@": (0, path_1.resolve)("src")
    },
    banner: {
        js: (0, header_1.buildHeader)(SCRIPT_VERSION)
    },
    define: (0, define_1.buildDefine)(SCRIPT_VERSION),
    plugins: [raw_ts_plugin_1.rawTsPlugin, minify_vendor_plugin_1.minifyVendorPlugin],
    loader: {
        ".svg": "text",
        ".css": "text",
        ".html": "text"
    }
};
