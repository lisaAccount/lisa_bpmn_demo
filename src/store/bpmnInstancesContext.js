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
    elementInfo: {
        bpmnElement: {},
        elementId: null,
        elementType: "",
        elementBusinessObject: {},
    },
}

const BpmnInstancesContext = createContext(initialBpmnInstancesContext)
export { BpmnInstancesContext, initialBpmnInstancesContext }
// export default createContext(initialBpmnInstancesContext)