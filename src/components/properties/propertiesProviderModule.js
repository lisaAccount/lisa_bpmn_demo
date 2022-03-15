import React, { Component } from "react";
import "./PropertiesProviderModule.css";
import PersonInfo from '../../components/formComponents/personInfo';
import {
  BpmnInstancesContext,
  initialBpmnInstancesContext,
} from '../../store/bpmnInstancesContext';


const path = require("path");
const CustomPropertiesPanelComponents = {};
const CustomPropertiesPanelComponentsFiles = require.context('./components', true, /\.js$/);
//  keys()返回components文件夹下所有以.js结尾的文件的文件名,返回文件名组成的数组  fileName为./timerTask/index.js
CustomPropertiesPanelComponentsFiles.keys().forEach(fileUrl => {
  const fileName = path.basename(fileUrl, '.js') // 'xxx.js'
  CustomPropertiesPanelComponents[fileName] = CustomPropertiesPanelComponentsFiles(fileUrl).default || CustomPropertiesPanelComponentsFiles(fileUrl)
});

console.log('CustomPropertiesPanelComponents', CustomPropertiesPanelComponents)


export default class PropertiesProviderModule extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    bpmnInstancesContext: initialBpmnInstancesContext,
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const { bpmnModeler } = this.props;

    // 初始化 modeler 以及其他 moddle
    if (!bpmnModeler) {
      // 避免加载时 流程图 并未加载完成
      this.timer = setTimeout(() => this.initData(), 10);
      return;
    }
    if (this.timer) clearTimeout(this.timer);

    const bpmnInstancesContext = {
      ...initialBpmnInstancesContext,
      modeler: bpmnModeler,
      modeling: bpmnModeler.get('modeling'),
      eventBus: bpmnModeler.get("eventBus"),
      bpmnFactory: bpmnModeler.get("bpmnFactory"),
      elementFactory: bpmnModeler.get("elementFactory"),
      elementRegistry: bpmnModeler.get("elementRegistry"),
    };

    this.setState({
      bpmnInstancesContext
    }, () => {
      this.getActiveElement()
    })
  };

  getActiveElement = () => {
    const {bpmnModeler} = this.props;
    //初始选中process面板
    this.handleFormChangedData(null);

    // 监听选中的元素和激活的元素
     bpmnModeler.on("element.changed", ({ element }) => {
      console.log("element", element);
    });
    bpmnModeler.on("selection.changed", selectedElement => {
      console.log("element", selectedElement);
    });
  }

  handleFormChangedData = (element) => {
    console.log('我是选中的元素')
  }

  render() {
    return (
      <div className='custom-panel-container'>
        <div className='custom-panel-main'>
          <BpmnInstancesContext.Provider value={initialBpmnInstancesContext}>

          </BpmnInstancesContext.Provider>
        </div>
      </div>
    );
  }
}
