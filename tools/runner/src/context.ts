import type { Catalog, Language } from "./catalog.ts";
import { findLanguage } from "./catalog.ts";

export interface Io {
  write(text: string): void;
  error(text: string): void;
}

export interface Context {
  readonly root: string;
  readonly catalog: Catalog;
  readonly io: Io;
}

export class UsageError extends Error {}

/** The languages a command applies to: all, or the one named with --lang. */
export function selectLanguages(ctx: Context, lang: string | undefined): readonly Language[] {
  if (lang === undefined) {
    return ctx.catalog.languages;
  }
  const found = findLanguage(ctx.catalog, lang);
  if (found === undefined) {
    throw new UsageError(`unknown language: ${lang}`);
  }
  return [found];
}

export function heading(name: string): string {
  return `== ${name} ==\n`;
}
