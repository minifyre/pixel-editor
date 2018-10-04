import silo from './logic.mjs'
const {config,logic,util}=silo
function input(evt,editor)
{
	input[evt.type](evt,editor)
}
silo.input=input

input.block=evt=>evt.preventDefault()

input.colorAdd=function(evt)
{
}
input.colorEdit=function(evt,editor)
{
	editor.state.palette[editor.state.editColor]=evt.target.value
	editor.state.editColor=-1
}

input.colorSelect=function(evt,editor=util.evt2customEl(evt))
{
	const
	type=evt.button,//primary, secondary, etc. [0=left click,1=wheel,2=right]
	id=parseInt(evt.target.getAttribute('data-color'))
	if(id===editor.state.selectedColors[type]) logic.colorEdit(editor.state,id)
	else editor.state.selectedColors[type]=id
}
//canvas events
input.pointerup=input.pointerdown=function(evt,editor)
{
	const
	{x,y}=util.evt2coords(evt),
	{pointerId:id,pressure}=evt
	editor.state.pointers[id].pressure=pressure
	if(pressure) logic.draw(editor.state,x,y,evt.button)
}
input.pointerout=function({pointerId:id},editor)
{
	delete editor.state.pointers[id]
}
input.pointerover=function(evt,editor)
{
	const
	{x,y}=util.evt2coords(evt),
	{pointerId:id,pressure}=evt
	editor.state.pointers[id]={id,pressure,x,y}
}
input.pointermove=function(evt,editor)
{
	const
	{x,y}=util.evt2coords(evt),
	{pointerId:id,pressure}=evt
	Object.assign(editor.state.pointers[id],{pressure,x,y})
	if(pressure) logic.draw(editor.state,x,y,util.evt2buttons(evt)[0])
}
export default silo