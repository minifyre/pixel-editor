import config from './config.mjs'
import util from './util.mjs'
const
logic=state=>Object.assign({},config.state,state),
silo={config,logic,util}
logic.draw=function(state,x,y,type=0)
{
	//@todo enable different tools
	state.pts[x+','+y]=state.selectedColors[type]
}
logic.colorEdit=(state,color)=>state.editColor=color
logic.colorSelect=function(state,id,type)
{
	if(id===state.selectedColors[type]) logic.colorEdit(state,id)//edit
	else state.selectedColors[type]=id//select
}
export default silo