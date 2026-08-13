"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const fs_1 = require("fs");
const esbuild_1 = require("esbuild");
const metafile_filter_1 = require("./metafile_filter");
const post_process_1 = require("./post_process");
async function buildUserscript() {
    const result = await (0, esbuild_1.build)(config_1.BUILD_OPTIONS);
    const content = (0, fs_1.readFileSync)(config_1.OUT_FILE, "utf8");
    (0, fs_1.writeFileSync)(config_1.OUT_FILE, (0, post_process_1.postProcess)(content), "utf8");
    (0, fs_1.writeFileSync)(config_1.META_FILE, JSON.stringify((0, metafile_filter_1.filterMetafile)(result.metafile), null, 2), "utf8");
    console.log("✔ Build completed.");
}
buildUserscript();
