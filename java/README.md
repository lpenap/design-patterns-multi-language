# Java

Design patterns in Java 25, one package per pattern under
`src/main/java/com/penapereira/patterns/`. The `runtime` package holds the
`Example` and `Output` contract, `ServiceLoader` discovery and the CLI.

## Requirements

* JDK 25. From the repository root, `sdk env` selects `25.0.4-tem` through
  [SDKMAN!](https://sdkman.io/) using the `.sdkmanrc` file.
* Nothing else: `./mvnw` downloads Maven on first use.

## Commands

```bash
./mvnw verify                          # compile, test, coverage gate (> 90 % line and branch)
java -jar target/patterns.jar list     # JSON array of pattern ids
java -jar target/patterns.jar run strategy
java -jar target/patterns.jar run --all
```

## Conventions

See [`docs/conventions.md`](../docs/conventions.md). Packages use a single
lower-case word or compound (`chainofresponsibility`); the catalog id stays
kebab-case. Examples are registered in
`src/main/resources/META-INF/services/com.penapereira.patterns.runtime.Example`.
