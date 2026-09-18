import { abstractFactoryExample } from "../abstract-factory/example.js";
import { factoryMethodExample } from "../factory-method/example.js";
import { strategyExample } from "../strategy/example.js";

// Every pattern folder adds one import line here. The CLI receives this array,
// so tests can pass fixtures instead and the production list stays exact.
export const examples = [abstractFactoryExample, factoryMethodExample, strategyExample];
