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
input.colorEdit=function(evt)
{

}
input.colorSelect=function(evt,editor=util.evt2customEl(evt))
{
	console.log(evt)
	const id=parseInt(evt.target.getAttribute('data-color'))
	if(id===editor.state.color) input.colorEdit(evt)
	else editor.state.color=id
}
//canvas events
input.pointerup=input.pointerdown=function(evt,editor)
{
	const
	{x,y}=util.evt2coords(evt),
	{pointerId:id,pressure}=evt
	editor.state.pointers[id].pressure=pressure
	if(pressure) logic.draw(editor.state,x,y)
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
	if(pressure) logic.draw(editor.state,x,y)
}
export default silo