# Future work: generative AI design patterns

*Status: reviewed on 2026-09-25 and deliberately left out of this repository
(PLAN.md decision 19). Kept here so a separate project can start from it.*

## Why not here

The repository's contract is a CLI that prints byte-identical output in every
language, verified in CI with no network access and no secrets. A generative
AI pattern has a model in the loop, which breaks all three at once:

- the output is not deterministic, so strict parity between languages and
  committed snapshots cannot hold;
- the model is reached over the network with an API key, which CI does not
  have and should not have;
- the interesting behaviour lives in the model's answers, not in the code
  around them, so a scripted stand-in shows the topology but not the point.

## What a separate project would build

The patterns worth implementing are the orchestration topologies around the
model, described in Lakshmanan and Hapke [24] and, for the agentic ones, in
Anthropic's "Building effective agents" (December 2024). Each is a control-flow
structure that can be shown with the same shape as the patterns here:

| Pattern | Shape | Deterministic stand-in |
|---|---|---|
| Prompt chaining | Sequence of calls, each consuming the previous output, with a gate between steps | Scripted model returning canned answers per step |
| Routing | Classify the input, dispatch to a specialised handler | Scripted classifier |
| Parallelisation | Fan out independent calls, aggregate (sectioning or voting) | Scripted answers, deterministic aggregation |
| Orchestrator and workers | A planner decomposes the task, workers execute, the planner synthesises | Scripted plan and worker outputs |
| Evaluator and optimiser | Generate, evaluate, feed the critique back, repeat until accepted | Scripted critique that accepts on the *n*-th round |
| Reflection | The model critiques and revises its own output | Same as above with one role |
| Tool calling | The model asks for a function to run and consumes its result | Real local tools, scripted requests |
| Retrieval grounding (RAG) | Retrieve passages, put them in the prompt, answer from them | Real in-memory retrieval, scripted answer |
| Guardrails | Validate input and output against rules before and after the call | Real validators |
| Semantic caching | Reuse an earlier answer for a similar enough question | Real embedding-free similarity (for example token overlap) |
| Memory | Carry state across turns: short-term buffer, long-term store | Real stores |

A project that adopts them would:

1. keep the `Example` and `Output` contract and the snapshot mechanism of this
   repository, with a `Model` interface whose only committed implementation is
   a scripted stub, so `run --all` stays deterministic and offline;
2. offer a second, uncommitted implementation of `Model` that calls a real API
   from an environment variable, for readers who want to see live answers;
3. document each pattern with the same outline as here (intent, motivation,
   structure, participants, example, consequences, language notes, related
   patterns, references), diagramming the topology rather than the model.

## References

- [24] V. Lakshmanan and H. Hapke, *Generative AI Design Patterns: Solutions to
  Common Challenges When Building GenAI Agents and Applications*. O'Reilly,
  2025.
- Anthropic, "Building effective agents," December 2024. Available online.
