import silo from './util.mjs'
const {logic}=silo
logic.draw=function(state,x,y,type=0)
{
	//@todo enable different tools
	state.pts[x+','+y]=state.selectedColors[type]
	state.modified=Date.now()
}
logic.colorAdd=function(state,color,type=-1)
{
	const id=state.palette.push(color)-1
	if(type!==-1) logic.colorSelect(state,id,type)
}
logic.colorEdit=function(state,color)
{
	state.view.editColor=color
	state.modified=Date.now()
}
logic.colorSelect=function(state,id,type)
{
	if(id===state.selectedColors[type]) logic.colorEdit(state,id)//edit
	else state.selectedColors[type]=id//select
}
export default silo