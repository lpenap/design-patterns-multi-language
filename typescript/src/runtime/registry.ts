import { abstractFactoryExample } from "../abstract-factory/example.ts";
import { adapterExample } from "../adapter/example.ts";
import { bridgeExample } from "../bridge/example.ts";
import { builderExample } from "../builder/example.ts";
import { chainOfResponsibilityExample } from "../chain-of-responsibility/example.ts";
import { commandExample } from "../command/example.ts";
import { compositeExample } from "../composite/example.ts";
import { decoratorExample } from "../decorator/example.ts";
import { facadeExample } from "../facade/example.ts";
import { factoryMethodExample } from "../factory-method/example.ts";
import { flyweightExample } from "../flyweight/example.ts";
import { iteratorExample } from "../iterator/example.ts";
import { mediatorExample } from "../mediator/example.ts";
import { monostateExample } from "../monostate/example.ts";
import { observerExample } from "../observer/example.ts";
import { producerConsumerExample } from "../producer-consumer/example.ts";
import { protectionProxyExample } from "../protection-proxy/example.ts";
import { prototypeExample } from "../prototype/example.ts";
import { simpleFactoryExample } from "../simple-factory/example.ts";
import { singletonExample } from "../singleton/example.ts";
import { stateExample } from "../state/example.ts";
import { strategyExample } from "../strategy/example.ts";
import { templateMethodExample } from "../template-method/example.ts";
import { virtualProxyExample } from "../virtual-proxy/example.ts";
import type { Example } from "./contract.ts";

/**
 * Every pattern folder adds one import line here. The CLI receives this array,
 * so tests can pass fixtures instead and the production list stays exact.
 */
export const examples: readonly Example[] = [abstractFactoryExample, adapterExample, bridgeExample, builderExample, chainOfResponsibilityExample, commandExample, compositeExample, decoratorExample, facadeExample, factoryMethodExample, flyweightExample, iteratorExample, mediatorExample, monostateExample, observerExample, producerConsumerExample, protectionProxyExample, prototypeExample, simpleFactoryExample, singletonExample, stateExample, strategyExample, templateMethodExample, virtualProxyExample];
