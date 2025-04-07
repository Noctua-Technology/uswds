import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { minifyHTMLLiterals } from "minify-html-literals";

async function readJsFilesFromTarget() {
  const targetDir = "target";
  const files = [];

  async function traverse(dir) {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.name.endsWith(".js")) {
        const content = await readFile(fullPath, "utf-8");

        files.push({
          path: fullPath,
          content,
        });
      }
    }
  }

  await traverse(targetDir);

  return files;
}

const files = await readJsFilesFromTarget();

for (const file of files) {
  const minified = await minifyHTMLLiterals(file.content, {
    fileName: file.path,
  });

  if (minified !== null) {
    await writeFile(file.path, minified.code);
  }
}
