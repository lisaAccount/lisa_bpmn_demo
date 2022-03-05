import React, { Component } from 'react';
import './App.css';
import getDefaultXml from './getDefaultXml.js';
import Modeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

import customPalette from './components/Palette'
import paletteEntries from './components/config/paletteEntries'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bpmnModeler: '',
    }
  }

  componentDidMount() {
    this.init()

  }

  init = () => {
    
    // // 去除默认工具栏
    const modules = Modeler.prototype._modules
    const index = modules.findIndex(it => it.paletteProvider)
    modules.splice(index, 1)

    const bpmnModeler = new Modeler({
      container: '#canvas',
      paletteContainer: '#palette',
      paletteEntries,
      additionalModules: [customPalette],
    });
    bpmnModeler.get('canvas').zoom('fit-viewport', 'auto')  //  调整在中间 
    this.getXML(bpmnModeler);
    this.setState({
      bpmnModeler,
    })
  }
/**
 * @description 这个函数
 * @param {number} bpmnModeler 
 * @returns {string} 
 */
//
getXML = async (bpmnModeler) => {
    try {
      await bpmnModeler.importXML(getDefaultXml())
    } catch (err) {
      console.log('bpmn error:', err)
    }
  }

  render() {
    return (
      <div>
        <div id="palette"></div>
        <div id="canvas"></div>
      </div>
    )
  }
}

