import { createContext } from "react";

const initialBpmnInstancesContext = {
    modeler: {},
    modeling: {},
    moddle: {},
    eventBus: {},
    bpmnFactory: {},
    elementFactory: {},
    elementRegistry: {},
    replace: {},
    selection: {},
}

const BpmnInstancesContext = createContext(initialBpmnInstancesContext)
export { BpmnInstancesContext, initialBpmnInstancesContext }
// export default createContext(initialBpmnInstancesContext)