import config from './config.mjs'
import util from './util.mjs'
const
logic=state=>Object.assign({},config.state,state),
silo={config,logic,util}
logic.draw=function(state,x,y,type)
{
	//@todo enable different tools
	state.pts[x+','+y]=state.selectedColors[type]
}
export default silo