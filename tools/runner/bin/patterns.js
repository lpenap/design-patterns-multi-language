#!/usr/bin/env node
// Entry shim: registers tsx so the TypeScript sources run without a build step.
import "tsx";
await import("../src/cli.ts");
