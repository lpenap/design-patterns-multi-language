import { abstractFactoryExample } from "../abstract-factory/example.ts";
import { strategyExample } from "../strategy/example.ts";
import type { Example } from "./contract.ts";

/**
 * Every pattern folder adds one import line here. The CLI receives this array,
 * so tests can pass fixtures instead and the production list stays exact.
 */
export const examples: readonly Example[] = [abstractFactoryExample, strategyExample];
