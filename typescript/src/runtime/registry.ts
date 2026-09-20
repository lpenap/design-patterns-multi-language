import { abstractFactoryExample } from "../abstract-factory/example.ts";
import { adapterExample } from "../adapter/example.ts";
import { bridgeExample } from "../bridge/example.ts";
import { chainOfResponsibilityExample } from "../chain-of-responsibility/example.ts";
import { decoratorExample } from "../decorator/example.ts";
import { factoryMethodExample } from "../factory-method/example.ts";
import { observerExample } from "../observer/example.ts";
import { producerConsumerExample } from "../producer-consumer/example.ts";
import { simpleFactoryExample } from "../simple-factory/example.ts";
import { singletonExample } from "../singleton/example.ts";
import { strategyExample } from "../strategy/example.ts";
import { templateMethodExample } from "../template-method/example.ts";
import type { Example } from "./contract.ts";

/**
 * Every pattern folder adds one import line here. The CLI receives this array,
 * so tests can pass fixtures instead and the production list stays exact.
 */
export const examples: readonly Example[] = [abstractFactoryExample, adapterExample, bridgeExample, chainOfResponsibilityExample, decoratorExample, factoryMethodExample, observerExample, producerConsumerExample, simpleFactoryExample, singletonExample, strategyExample, templateMethodExample];
