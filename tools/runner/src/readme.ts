import type { Catalog, Category, Pattern } from "./catalog.ts";
import { readSnapshot } from "./snapshots.ts";

export const START = "<!-- catalogue:start -->";
export const END = "<!-- catalogue:end -->";

/** Renders the catalogue section: one table per category, in catalog order. */
export function renderCatalogue(catalog: Catalog, root: string): string {
  const sections = catalog.categories.map((category) => renderCategory(catalog, category, root));
  return sections.join("\n");
}

function renderCategory(catalog: Catalog, category: Category, root: string): string {
  const concurrency = category.id === "concurrency";
  const langs = catalog.languages.map((l) => l.name);
  const header = `| | ${concurrency ? "Construct" : "Pattern"} | ${concurrency ? "Problem" : "Intent"} | ${langs.join(" | ")} |`;
  const rule = `|${"---|".repeat(3 + langs.length)}`;
  const rows = catalog.patterns
    .filter((p) => p.category === category.id)
    .map((p) => renderRow(catalog, p, root));
  return `### ${category.name}\n\n${[header, rule, ...rows].join("\n")}\n`;
}

function renderRow(catalog: Catalog, pattern: Pattern, root: string): string {
  const status = catalog.languages.map((l) => {
    const declared = pattern.implementations.has(l.id);
    return declared && readSnapshot(root, pattern.id, l.id) !== null ? "done" : "pending";
  });
  return `| ${pattern.icon} | [${pattern.name}](${pattern.doc}) | ${pattern.intent} | ${status.join(" | ")} |`;
}

/** Replaces the text between the markers; throws if a marker is missing. */
export function splice(readme: string, section: string): string {
  const start = readme.indexOf(START);
  const end = readme.indexOf(END);
  if (start < 0 || end < 0 || end < start) {
    throw new Error(`README is missing the ${START} / ${END} markers`);
  }
  return readme.slice(0, start + START.length) + "\n" + section + readme.slice(end);
}

/** The current section text between the markers, or null if the markers are missing. */
export function currentSection(readme: string): string | null {
  const start = readme.indexOf(START);
  const end = readme.indexOf(END);
  if (start < 0 || end < 0 || end < start) {
    return null;
  }
  return readme.slice(start + START.length + 1, end);
}
