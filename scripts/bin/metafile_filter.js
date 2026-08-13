"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMetafile = filterMetafile;
const EXCLUDED_FROM_METAFILE = /node_modules/;
function omitExcluded(entries) {
    return Object.fromEntries(Object.entries(entries).filter(([path]) => !EXCLUDED_FROM_METAFILE.test(path)));
}
function filterMetafile(metafile) {
    const outputs = Object.entries(metafile.outputs).map(([path, output]) => [path, { ...output, inputs: omitExcluded(output.inputs) }]);
    return { inputs: omitExcluded(metafile.inputs), outputs: Object.fromEntries(outputs) };
}
