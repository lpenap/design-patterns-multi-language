import { abstractFactoryExample } from "../abstract-factory/example.js";
import { adapterExample } from "../adapter/example.js";
import { bridgeExample } from "../bridge/example.js";
import { builderExample } from "../builder/example.js";
import { chainOfResponsibilityExample } from "../chain-of-responsibility/example.js";
import { commandExample } from "../command/example.js";
import { compositeExample } from "../composite/example.js";
import { decoratorExample } from "../decorator/example.js";
import { facadeExample } from "../facade/example.js";
import { factoryMethodExample } from "../factory-method/example.js";
import { flyweightExample } from "../flyweight/example.js";
import { interpreterExample } from "../interpreter/example.js";
import { iteratorExample } from "../iterator/example.js";
import { mediatorExample } from "../mediator/example.js";
import { mementoExample } from "../memento/example.js";
import { monostateExample } from "../monostate/example.js";
import { observerExample } from "../observer/example.js";
import { objectPoolExample } from "../object-pool/example.js";
import { producerConsumerExample } from "../producer-consumer/example.js";
import { protectionProxyExample } from "../protection-proxy/example.js";
import { prototypeExample } from "../prototype/example.js";
import { simpleFactoryExample } from "../simple-factory/example.js";
import { singletonExample } from "../singleton/example.js";
import { stateExample } from "../state/example.js";
import { strategyExample } from "../strategy/example.js";
import { templateMethodExample } from "../template-method/example.js";
import { virtualProxyExample } from "../virtual-proxy/example.js";
import { visitorExample } from "../visitor/example.js";

// Every pattern folder adds one import line here. The CLI receives this array,
// so tests can pass fixtures instead and the production list stays exact.
export const examples = [abstractFactoryExample, adapterExample, bridgeExample, builderExample, chainOfResponsibilityExample, commandExample, compositeExample, decoratorExample, facadeExample, factoryMethodExample, flyweightExample, interpreterExample, iteratorExample, mediatorExample, mementoExample, monostateExample, observerExample, objectPoolExample, producerConsumerExample, protectionProxyExample, prototypeExample, simpleFactoryExample, singletonExample, stateExample, strategyExample, templateMethodExample, virtualProxyExample, visitorExample];
