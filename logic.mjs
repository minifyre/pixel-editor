import silo from './util.mjs'
const {logic}=silo
logic.draw=function(state,x,y,type=0)
{
	//@todo enable different tools
	state.file.pts[x+','+y]=state.view.selectedColors[type]
	state.file.modified=Date.now()
}
logic.colorAdd=function(state,color,type=-1)
{
	const id=state.file.palette.push(color)-1
	if(type!==-1) logic.colorSelect(state,id,type)
}
logic.colorEdit=function(state,color)
{
	state.view.editColor=color
	state.file.modified=Date.now()
}
logic.colorSelect=function(state,id,type)
{
	if(id===state.view.selectedColors[type]) logic.colorEdit(state,id)//edit
	else state.view.selectedColors[type]=id//select
}
logic.colorSet=function(state,color)
{
	state.file.palette[state.view.editColor]=color
	state.view.editColor=-1
	state.file.modified=Date.now()
}
export default silo