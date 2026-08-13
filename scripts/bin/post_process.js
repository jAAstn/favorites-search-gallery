"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProcess = postProcess;
function postProcess(content) {
    return content
        .replace(/^\s*\/\/\s*(?:src|ts-raw|node_modules).*\n/gm, "")
        .replace(/\r?\n/g, "\r\n");
}
