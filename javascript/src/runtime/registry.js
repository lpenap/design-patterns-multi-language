import { abstractFactoryExample } from "../abstract-factory/example.js";
import { adapterExample } from "../adapter/example.js";
import { bridgeExample } from "../bridge/example.js";
import { chainOfResponsibilityExample } from "../chain-of-responsibility/example.js";
import { decoratorExample } from "../decorator/example.js";
import { factoryMethodExample } from "../factory-method/example.js";
import { observerExample } from "../observer/example.js";
import { producerConsumerExample } from "../producer-consumer/example.js";
import { simpleFactoryExample } from "../simple-factory/example.js";
import { singletonExample } from "../singleton/example.js";
import { strategyExample } from "../strategy/example.js";
import { templateMethodExample } from "../template-method/example.js";

// Every pattern folder adds one import line here. The CLI receives this array,
// so tests can pass fixtures instead and the production list stays exact.
export const examples = [abstractFactoryExample, adapterExample, bridgeExample, chainOfResponsibilityExample, decoratorExample, factoryMethodExample, observerExample, producerConsumerExample, simpleFactoryExample, singletonExample, strategyExample, templateMethodExample];
