import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "./slugify.js";

test("lowercases and hyphenates", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("strips accents", () => {
  assert.equal(slugify("Café Déjà Vu"), "cafe-deja-vu");
});

test("trims leading and trailing separators", () => {
  assert.equal(slugify("  --Hi!--  "), "hi");
});

test("empty input gives empty slug", () => {
  assert.equal(slugify(""), "");
});
