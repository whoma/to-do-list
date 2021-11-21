#!/usr/bin/env node

import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["src/index.js"],
    bundle: true,
    outfile: "www/dist/out.js",
  },
  { root: "www" },
);