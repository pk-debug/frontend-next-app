import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

import {
  getSiteContentSection,
  saveSiteContentSection,
  defaultSiteContent,
  resetSiteContentStore,
} from "./site-content-store.mjs";

const storePath = path.join(process.cwd(), "src", "server", "data", "site-content.json");

test.beforeEach(async () => {
  fs.writeFileSync(storePath, JSON.stringify(defaultSiteContent, null, 2), "utf8");
  await resetSiteContentStore();
});

test("getSiteContentSection returns the default home content payload", async () => {
  const home = await getSiteContentSection("home");

  assert.equal(home.section, "home");
  assert.ok(Array.isArray(home.data.metrics));
  assert.equal(home.data.headline, defaultSiteContent.home.headline);
});

test("saveSiteContentSection updates a content section and persists the new value", async () => {
  const nextTitle = "Updated growth story";
  const updated = await saveSiteContentSection("home", {
    ...defaultSiteContent.home,
    headline: nextTitle,
  });

  assert.equal(updated.data.headline, nextTitle);

  const reloaded = await getSiteContentSection("home");
  assert.equal(reloaded.data.headline, nextTitle);
});
