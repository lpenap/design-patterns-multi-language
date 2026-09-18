import { existsSync, readFileSync } from "node:fs";
import { dirname, join, parse as parsePath } from "node:path";
import { parse } from "yaml";

export interface Language {
  readonly id: string;
  readonly name: string;
  readonly dir: string;
  readonly run: string;
}

export interface Category {
  readonly id: string;
  readonly name: string;
}

export type Parity = "strict" | "loose";

export interface Pattern {
  readonly id: string;
  readonly icon: string;
  readonly name: string;
  readonly category: string;
  readonly intent: string;
  readonly doc: string;
  readonly parity: Parity;
  /** language id → implementation path relative to the repository root */
  readonly implementations: ReadonlyMap<string, string>;
}

export interface Catalog {
  readonly languages: readonly Language[];
  readonly categories: readonly Category[];
  readonly patterns: readonly Pattern[];
}

export interface LoadOptions {
  /** Test catalogs may use ids with the reserved `fixture-` prefix. */
  readonly allowFixtureIds?: boolean;
}

export const ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
export const CATALOG_FILE = "catalog.yaml";

export class CatalogError extends Error {}

/** Walks up from `start` to the directory containing `catalog.yaml`. */
export function findRoot(start: string): string {
  let dir = start;
  for (;;) {
    if (existsSync(join(dir, CATALOG_FILE))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir || dir === parsePath(dir).root) {
      throw new CatalogError(`no ${CATALOG_FILE} found above ${start}`);
    }
    dir = parent;
  }
}

export function loadCatalog(root: string, options: LoadOptions = {}): Catalog {
  const raw: unknown = parse(readFileSync(join(root, CATALOG_FILE), "utf8"));
  const doc = asRecord(raw, "catalog");
  if (doc.version !== 1) {
    throw new CatalogError("catalog: version must be 1");
  }

  const languages = Object.entries(asRecord(doc.languages, "languages")).map(([id, value]) => {
    const l = asRecord(value, `languages.${id}`);
    return { id, name: str(l.name, `languages.${id}.name`), dir: str(l.dir, `languages.${id}.dir`), run: str(l.run, `languages.${id}.run`) };
  });
  if (languages.length === 0) {
    throw new CatalogError("catalog: at least one language is required");
  }
  const languageIds = new Set(languages.map((l) => l.id));

  const categories = asArray(doc.categories, "categories").map((value, i) => {
    const c = asRecord(value, `categories[${i}]`);
    return { id: str(c.id, `categories[${i}].id`), name: str(c.name, `categories[${i}].name`) };
  });
  const categoryIds = new Set(categories.map((c) => c.id));
  if (categoryIds.size !== categories.length) {
    throw new CatalogError("catalog: duplicate category id");
  }

  const seen = new Set<string>();
  const patterns = asArray(doc.patterns, "patterns").map((value, i) => {
    const p = asRecord(value, `patterns[${i}]`);
    const id = str(p.id, `patterns[${i}].id`);
    if (!ID_PATTERN.test(id)) {
      throw new CatalogError(`patterns[${i}]: id "${id}" is not kebab-case`);
    }
    if (id.startsWith("fixture-") && options.allowFixtureIds !== true) {
      throw new CatalogError(`patterns[${i}]: id "${id}" uses the reserved fixture- prefix`);
    }
    if (seen.has(id)) {
      throw new CatalogError(`patterns[${i}]: duplicate id "${id}"`);
    }
    seen.add(id);
    const category = str(p.category, `${id}.category`);
    if (!categoryIds.has(category)) {
      throw new CatalogError(`${id}: unknown category "${category}"`);
    }
    const parity = asParity(p.parity, id);
    const implementations = new Map<string, string>();
    for (const [lang, path] of Object.entries(asRecord(p.implementations ?? {}, `${id}.implementations`))) {
      if (!languageIds.has(lang)) {
        throw new CatalogError(`${id}: implementation for unknown language "${lang}"`);
      }
      implementations.set(lang, str(path, `${id}.implementations.${lang}`));
    }
    return {
      id,
      icon: str(p.icon, `${id}.icon`),
      name: str(p.name, `${id}.name`),
      category,
      intent: str(p.intent, `${id}.intent`),
      doc: str(p.doc, `${id}.doc`),
      parity,
      implementations,
    };
  });

  return { languages, categories, patterns };
}

export function findPattern(catalog: Catalog, id: string): Pattern | undefined {
  return catalog.patterns.find((p) => p.id === id);
}

export function findLanguage(catalog: Catalog, id: string): Language | undefined {
  return catalog.languages.find((l) => l.id === id);
}

function asRecord(value: unknown, what: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new CatalogError(`catalog: ${what} must be a mapping`);
  }
  return value as Record<string, unknown>;
}

function asArray(value: unknown, what: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new CatalogError(`catalog: ${what} must be a list`);
  }
  return value as unknown[];
}

function asParity(value: unknown, id: string): Parity {
  if (value === undefined || value === "strict") {
    return "strict";
  }
  if (value === "loose") {
    return "loose";
  }
  throw new CatalogError(`${id}: parity must be strict or loose`);
}

function str(value: unknown, what: string): string {
  if (typeof value !== "string" || value === "") {
    throw new CatalogError(`catalog: ${what} must be a non-empty string`);
  }
  return value;
}
