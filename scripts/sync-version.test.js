const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const { syncVersionFiles } = require("./sync-version");

test("updates package.json and every SKILL.md version", async (t) => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sync-version-"));
  t.after(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  await fs.mkdir(path.join(tempDir, "skills", "alpha"), { recursive: true });
  await fs.mkdir(path.join(tempDir, "skills", "beta", "nested"), {
    recursive: true,
  });

  await fs.writeFile(
    path.join(tempDir, "package.json"),
    JSON.stringify({ name: "agent-skills", version: "0.0.0" }, null, 2) + "\n"
  );
  await fs.writeFile(
    path.join(tempDir, "skills", "alpha", "SKILL.md"),
    '---\nname: "alpha"\nversion: "0.1.0"\n---\n'
  );
  await fs.writeFile(
    path.join(tempDir, "skills", "beta", "nested", "SKILL.md"),
    '---\nname: "beta"\nversion: "9.9.9"\n---\n'
  );

  const changedFiles = await syncVersionFiles({
    repoRoot: tempDir,
    version: "2.5.0",
  });

  assert.deepEqual(changedFiles.sort(), [
    "package.json",
    "skills/alpha/SKILL.md",
    "skills/beta/nested/SKILL.md",
  ]);

  const packageJson = JSON.parse(
    await fs.readFile(path.join(tempDir, "package.json"), "utf8")
  );
  assert.equal(packageJson.version, "2.5.0");

  const alphaSkill = await fs.readFile(
    path.join(tempDir, "skills", "alpha", "SKILL.md"),
    "utf8"
  );
  assert.match(alphaSkill, /version: "2.5.0"/);

  const betaSkill = await fs.readFile(
    path.join(tempDir, "skills", "beta", "nested", "SKILL.md"),
    "utf8"
  );
  assert.match(betaSkill, /version: "2.5.0"/);
});

test("throws on an invalid version input", async () => {
  await assert.rejects(
    async () => {
      await syncVersionFiles({ repoRoot: process.cwd(), version: "" });
    },
    /Version is required/
  );
});
