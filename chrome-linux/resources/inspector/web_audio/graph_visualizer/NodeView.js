export class NodeView{constructor(data,label){this.id=data.nodeId;this.type=data.nodeType;this.numberOfInputs=data.numberOfInputs;this.numberOfOutputs=data.numberOfOutputs;this.label=label;this.size={width:0,height:0};this.position=null;this._layout={inputPortSectionHeight:0,outputPortSectionHeight:0,maxTextLength:0,totalHeight:0,};this.ports=new Map();this._initialize(data);}
_initialize(data){this._updateNodeLayoutAfterAddingNode(data);this._setupInputPorts();this._setupOutputPorts();}
addParamPort(paramId,paramType){const paramPorts=this.getPortsByType(WebAudio.GraphVisualizer.PortTypes.Param);const numberOfParams=paramPorts.length;const{x,y}=WebAudio.GraphVisualizer.NodeRendererUtility.calculateParamPortXY(numberOfParams,this._layout.inputPortSectionHeight);this._addPort({id:generateParamPortId(this.id,paramId),type:WebAudio.GraphVisualizer.PortTypes.Param,label:paramType,x,y,});this._updateNodeLayoutAfterAddingParam(numberOfParams+1,paramType);this._setupOutputPorts();}
getPortsByType(type){const result=[];this.ports.forEach(port=>{if(port.type===type){result.push(port);}});return result;}
_updateNodeLayoutAfterAddingNode(data){const{TotalInputPortHeight,LeftSideTopPadding,BottomPaddingWithoutParam,TotalOutputPortHeight,NodeLabelFontStyle,}=WebAudio.GraphVisualizer.GraphStyles;const inputPortSectionHeight=TotalInputPortHeight*Math.max(1,data.numberOfInputs)+LeftSideTopPadding;this._layout.inputPortSectionHeight=inputPortSectionHeight;this._layout.outputPortSectionHeight=TotalOutputPortHeight*data.numberOfOutputs;this._layout.totalHeight=Math.max(inputPortSectionHeight+BottomPaddingWithoutParam,this._layout.outputPortSectionHeight);const nodeLabelLength=measureTextWidth(this.label,NodeLabelFontStyle);this._layout.maxTextLength=Math.max(this._layout.maxTextLength,nodeLabelLength);this._updateNodeSize();}
_updateNodeLayoutAfterAddingParam(numberOfParams,paramType){const leftSideMaxHeight=this._layout.inputPortSectionHeight+
numberOfParams*WebAudio.GraphVisualizer.GraphStyles.TotalParamPortHeight+
WebAudio.GraphVisualizer.GraphStyles.BottomPaddingWithParam;this._layout.totalHeight=Math.max(leftSideMaxHeight,this._layout.outputPortSectionHeight);const paramLabelLength=measureTextWidth(paramType,WebAudio.GraphVisualizer.GraphStyles.ParamLabelFontStyle);this._layout.maxTextLength=Math.max(this._layout.maxTextLength,paramLabelLength);this._updateNodeSize();}
_updateNodeSize(){this.size={width:Math.ceil(WebAudio.GraphVisualizer.GraphStyles.LeftMarginOfText+this._layout.maxTextLength+
WebAudio.GraphVisualizer.GraphStyles.RightMarginOfText),height:this._layout.totalHeight,};}
_setupInputPorts(){for(let i=0;i<this.numberOfInputs;i++){const{x,y}=WebAudio.GraphVisualizer.NodeRendererUtility.calculateInputPortXY(i);this._addPort({id:generateInputPortId(this.id,i),type:WebAudio.GraphVisualizer.PortTypes.In,x,y,});}}
_setupOutputPorts(){for(let i=0;i<this.numberOfOutputs;i++){const portId=generateOutputPortId(this.id,i);const{x,y}=WebAudio.GraphVisualizer.NodeRendererUtility.calculateOutputPortXY(i,this.size,this.numberOfOutputs);if(this.ports.has(portId)){const port=this.ports.get(portId);port.x=x;port.y=y;}else{this._addPort({id:portId,type:WebAudio.GraphVisualizer.PortTypes.Out,x,y,});}}}
_addPort(port){this.ports.set(port.id,port);}}
export const generateInputPortId=(nodeId,inputIndex)=>{return`${nodeId}-input-${inputIndex || 0}`;};export const generateOutputPortId=(nodeId,outputIndex)=>{return`${nodeId}-output-${outputIndex || 0}`;};export const generateParamPortId=(nodeId,paramId)=>{return`${nodeId}-param-${paramId}`;};export class NodeLabelGenerator{constructor(){this._totalNumberOfNodes=0;}
generateLabel(nodeType){if(nodeType.endsWith('Node')){nodeType=nodeType.slice(0,nodeType.length-4);}
this._totalNumberOfNodes+=1;const label=`${nodeType} ${this._totalNumberOfNodes}`;return label;}}
export const measureTextWidth=(text,fontStyle)=>{if(!WebAudio.GraphVisualizer._contextForFontTextMeasuring){WebAudio.GraphVisualizer._contextForFontTextMeasuring=createElement('canvas').getContext('2d');}
const context=WebAudio.GraphVisualizer._contextForFontTextMeasuring;context.save();context.font=fontStyle;const width=UI.measureTextWidth(context,text);context.restore();return width;};self.WebAudio=self.WebAudio||{};WebAudio=WebAudio||{};WebAudio.GraphVisualizer=WebAudio.GraphVisualizer||{};WebAudio.GraphVisualizer.NodeView=NodeView;WebAudio.GraphVisualizer.NodeLabelGenerator=NodeLabelGenerator;WebAudio.GraphVisualizer.generateInputPortId=generateInputPortId;WebAudio.GraphVisualizer.generateOutputPortId=generateOutputPortId;WebAudio.GraphVisualizer.generateParamPortId=generateParamPortId;WebAudio.GraphVisualizer.measureTextWidth=measureTextWidth;