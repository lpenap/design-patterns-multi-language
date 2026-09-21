# Thin façade over the four toolchains and the orchestrator.
# Every target delegates; no logic lives here.
#
#   make setup            install every toolchain's dependencies
#   make test             run every language's tests and coverage gates
#   make lint             run every language's lint and type checks
#   make list L=python    list the examples one language implements
#   make run P=strategy   run one pattern in every language, side by side
#   make run P=strategy L=java
#   make run-all L=typescript
#   make snapshot         record outputs into snapshots/ (UPDATE=1 to overwrite)
#   make check            rerun everything and diff against snapshots
#   make validate         catalog <-> filesystem <-> docs <-> snapshots consistency

SHELL := /bin/bash
# The project JDK from .sdkmanrc, regardless of the shell's JAVA_HOME (SDKMAN sets it to its default JDK).
JAVA_HOME := $(HOME)/.sdkman/candidates/java/$(shell sed -n 's/^java=//p' .sdkmanrc)
export JAVA_HOME
# Put the selected JDK first so `java` resolves to it even when SDKMAN's default JDK is on the PATH.
export PATH := $(JAVA_HOME)/bin:$(PATH)
MVN := cd java && ./mvnw -q -ntp
UV := cd python && uv run
PNPM := pnpm
RUNNER := node tools/runner/bin/patterns.js

.PHONY: setup test lint list run run-all snapshot check validate clean \
        test-java test-python test-typescript test-javascript test-runner \
        lint-java lint-python lint-typescript lint-javascript lint-runner

setup:
	$(PNPM) install --frozen-lockfile
	cd python && uv sync
	$(MVN) -DskipTests verify

test: test-java test-python test-typescript test-javascript test-runner

test-java:
	$(MVN) verify

test-python:
	$(UV) pytest

test-typescript:
	$(PNPM) --filter typescript test

test-javascript:
	$(PNPM) --filter javascript test

test-runner:
	$(PNPM) --filter @patterns/runner test

lint: lint-java lint-python lint-typescript lint-javascript lint-runner

lint-java:
	$(MVN) -DskipTests compile

lint-python:
	$(UV) ruff check .
	$(UV) ruff format --check .
	$(UV) mypy

lint-typescript:
	$(PNPM) --filter typescript lint

lint-javascript:
	$(PNPM) --filter javascript lint

lint-runner:
	$(PNPM) --filter @patterns/runner lint

list:
	$(RUNNER) list $(if $(L),--lang $(L),)

run:
	$(RUNNER) run $(P) $(if $(L),--lang $(L),)

run-all:
	$(RUNNER) run --all $(if $(L),--lang $(L),)

snapshot:
	$(RUNNER) snapshot $(if $(UPDATE),--update,)

check:
	$(RUNNER) check

validate:
	$(RUNNER) validate

clean:
	$(MVN) clean
	rm -rf python/.venv python/.pytest_cache python/.mypy_cache python/.ruff_cache
	rm -rf node_modules typescript/node_modules typescript/coverage javascript/node_modules javascript/coverage tools/runner/node_modules tools/runner/dist
