#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

async function listFilesByName(dir, targetName) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...(await listFilesByName(fullPath, targetName)));
      continue;
    }

    if (entry.isFile() && entry.name === targetName) {
      results.push(fullPath);
    }
  }

  return results;
}

function ensureVersion(version) {
  if (!version || typeof version !== "string") {
    throw new Error("Version is required");
  }
}

async function updatePackageJson(packageJsonPath, version) {
  const raw = await fs.readFile(packageJsonPath, "utf8");
  const data = JSON.parse(raw);
  data.version = version;
  await fs.writeFile(packageJsonPath, `${JSON.stringify(data, null, 2)}\n`);
}

async function updateSkillFile(skillPath, version) {
  const raw = await fs.readFile(skillPath, "utf8");
  const updated = raw.replace(
    /^version:\s*"[^\"]*"/m,
    `version: "${version}"`
  );
  await fs.writeFile(skillPath, updated);
}

async function syncVersionFiles({ repoRoot, version }) {
  ensureVersion(version);

  const changedFiles = [];

  const packageJsonPath = path.join(repoRoot, "package.json");
  await updatePackageJson(packageJsonPath, version);
  changedFiles.push("package.json");

  const skillsRoot = path.join(repoRoot, "skills");
  const skillFiles = await listFilesByName(skillsRoot, "SKILL.md");

  for (const skillFile of skillFiles) {
    await updateSkillFile(skillFile, version);
    changedFiles.push(path.relative(repoRoot, skillFile));
  }

  return changedFiles;
}

async function main() {
  const version = process.argv[2];
  try {
    const changedFiles = await syncVersionFiles({
      repoRoot: process.cwd(),
      version,
    });
    console.log(`Updated version to ${version} in ${changedFiles.length} files.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  syncVersionFiles,
};
