import type { AstroIntegration } from "astro";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Utility function for formatted logging
function formatLog(tag: string, message: string) {
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });

  // eslint-disable-next-line no-console
  console.log(
    "\n" + // Add space above
      `\x1b[90m${timestamp}\x1b[0m ` + // Gray timestamp
      `[\x1b[36m${tag}\x1b[0m] ` + // Cyan colored tag
      `${message}` + // Message
      "\n" // Add space below
  );
}

async function copyFiles(srcDir: string, destDir: string) {
  const files = await fs.readdir(srcDir);

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyFiles(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function copyPreloadedAssets(distDir: string, vercelStaticDir: string) {
  const publicPreloadedDir = path.join("public", "assets", "preloaded");
  const distPreloadedDir = path.join(distDir, "assets", "preloaded");
  const vercelPreloadedDir = path.join(vercelStaticDir, "assets", "preloaded");

  try {
    // Create preloaded directories
    await fs.mkdir(distPreloadedDir, { recursive: true });
    await fs.mkdir(vercelPreloadedDir, { recursive: true });

    // Copy from public to dist if public/assets/preloaded exists
    try {
      const publicFiles = await fs.readdir(publicPreloadedDir);
      await Promise.all(
        publicFiles.map(async (file) => {
          const srcPath = path.join(publicPreloadedDir, file);
          const destPath = path.join(distPreloadedDir, file);
          await fs.copyFile(srcPath, destPath);
        })
      );
      formatLog("copy-files", "Copied preloaded assets to dist directory");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
      // Silently skip if public/assets/preloaded doesn't exist
    }

    // Copy from dist to vercel if dist/assets/preloaded exists
    try {
      const distFiles = await fs.readdir(distPreloadedDir);
      await Promise.all(
        distFiles.map(async (file) => {
          const srcPath = path.join(distPreloadedDir, file);
          const destPath = path.join(vercelPreloadedDir, file);
          await fs.copyFile(srcPath, destPath);
        })
      );
      formatLog(
        "copy-files",
        "Copied preloaded assets to Vercel static directory"
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
      // Silently skip if dist/assets/preloaded doesn't exist
    }
  } catch (error) {
    throw error;
  }
}

export function CopyFilesPlugin(): AstroIntegration {
  return {
    hooks: {
      "astro:build:done": async ({ dir }) => {
        formatLog("copy-files", "Starting file copy process");

        const distDir = fileURLToPath(dir.href);
        const staticDir = path.resolve(".vercel/output/static");

        // Copy preloaded assets to both dist and vercel directories
        await copyPreloadedAssets(distDir, staticDir);

        // Copy all files to .vercel/output/static
        await fs.mkdir(staticDir, { recursive: true });
        await copyFiles(distDir, staticDir);

        formatLog("copy-files", "Completed file copy process");
      },
    },
    name: "copy-files",
  };
}
