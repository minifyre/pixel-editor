import config from './config.mjs'
import util from './util.mjs'
const
logic=state=>Object.assign({},config.state,state),
silo={config,logic,util}
logic.draw=function(state,x,y)
{
	//@todo enable different tools
	state.pts[x+','+y]=0//@todo allow different colors
}
export default silo