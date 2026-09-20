import { abstractFactoryExample } from "../abstract-factory/example.js";
import { adapterExample } from "../adapter/example.js";
import { bridgeExample } from "../bridge/example.js";
import { builderExample } from "../builder/example.js";
import { chainOfResponsibilityExample } from "../chain-of-responsibility/example.js";
import { compositeExample } from "../composite/example.js";
import { decoratorExample } from "../decorator/example.js";
import { facadeExample } from "../facade/example.js";
import { factoryMethodExample } from "../factory-method/example.js";
import { flyweightExample } from "../flyweight/example.js";
import { observerExample } from "../observer/example.js";
import { producerConsumerExample } from "../producer-consumer/example.js";
import { protectionProxyExample } from "../protection-proxy/example.js";
import { simpleFactoryExample } from "../simple-factory/example.js";
import { singletonExample } from "../singleton/example.js";
import { strategyExample } from "../strategy/example.js";
import { templateMethodExample } from "../template-method/example.js";
import { virtualProxyExample } from "../virtual-proxy/example.js";

// Every pattern folder adds one import line here. The CLI receives this array,
// so tests can pass fixtures instead and the production list stays exact.
export const examples = [abstractFactoryExample, adapterExample, bridgeExample, builderExample, chainOfResponsibilityExample, compositeExample, decoratorExample, facadeExample, factoryMethodExample, flyweightExample, observerExample, producerConsumerExample, protectionProxyExample, simpleFactoryExample, singletonExample, strategyExample, templateMethodExample, virtualProxyExample];
