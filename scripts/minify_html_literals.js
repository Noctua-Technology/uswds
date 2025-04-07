#!/usr/bin/env node

import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { minifyHTMLLiterals } from "minify-literals";

async function findFiles(dir, ext, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await findFiles(fullPath, ext, files);
    } else if (entry.name.endsWith(ext)) {
      const content = await readFile(fullPath, "utf-8");

      files.push({ path: fullPath, content });
    }
  }

  return files;
}

const files = await findFiles("target", ".js");

for (const file of files) {
  const minified = await minifyHTMLLiterals(file.content, {
    fileName: file.path,
  });

  if (minified !== null) {
    await writeFile(file.path, minified.code);
  }
}
