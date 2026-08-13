"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawTsPlugin = void 0;
const esbuild = __importStar(require("esbuild"));
const path = __importStar(require("path"));
const fs_1 = require("fs");
exports.rawTsPlugin = {
    name: "ts-raw-plugin",
    setup(build) {
        build.onResolve({ filter: /\?raw$/ }, resolveRawImport);
        build.onLoad({ filter: /\.ts$/, namespace: "ts-raw" }, loadTsIifeString);
    }
};
function resolveRawImport(args) {
    return { path: resolveRawPath(args), namespace: "ts-raw" };
}
function resolveRawPath(args) {
    const rawPath = args.path.replace(/\?raw$/, "");
    const withExtension = rawPath.endsWith(".ts") ? rawPath : `${rawPath}.ts`;
    return resolveSpecifier(withExtension, args.resolveDir);
}
function resolveSpecifier(specifier, resolveDir) {
    if (specifier.startsWith("@/")) {
        return path.resolve("src", specifier.slice("@/".length));
    }
    return path.resolve(resolveDir, specifier);
}
function loadTsIifeString(args) {
    return fs_1.promises.readFile(args.path, "utf8")
        .then(content => compileTsIife(content))
        .then(result => ({ contents: result.code, loader: "text" }));
}
function compileTsIife(content) {
    return esbuild.transform(content, { loader: "ts", format: "iife", target: "esnext", sourcemap: false });
}
