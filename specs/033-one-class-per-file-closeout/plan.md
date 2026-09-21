# Implementation Plan: One Class per File — Close-out

**Branch**: `033-one-class-per-file-closeout` | **Date**: 2026-09-21 | **Spec**: [spec.md](spec.md)

Constitution check: no amendment; Principle IV (1.1.0) becomes enforced rather than advisory. All principles PASS.

```text
tools/runner/src/commands/validate.ts          ONE_CLASS_PER_FILE_LEVEL = "error"
tools/runner/src/commands/validate.test.ts     conformant repo passes; raw fixtures fail with error findings
tools/runner/src/args-main.test.ts             CLI dispatch test runs on a conformant repo
tools/runner/tests/helpers.ts                  conformStructure(root): removes the fixtures' deliberate violations
docs/patterns/*.md                             Participants tables: every name linked to its file (282 links added)
java/src/main/java/.../*.java                  Javadoc on the 29 concrete classes that lacked one
README.md                                      catalogue regenerated (no change needed)
tools/refactor/                                removed
PLAN.md                                        Phase 4 delivered; spec 033 ticked
```

Design notes: the link pass is mechanical. For a backticked PascalCase name in a language cell the candidate file is `<Name>.java`, `<snake_name>.py` (`example.py` for `*Example`), `<kebab-name>.ts` / `.js` (`example.ts` / `.js` for `*Example`) under the catalog's implementation path; the name is linked only when the file exists, so JDK types named in Java cells stay plain. The validator fixtures keep their violations because `structure.test.ts` asserts on them; the tests that need a clean repository call `conformStructure` first.
