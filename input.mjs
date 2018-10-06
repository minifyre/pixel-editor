import silo from './logic.mjs'
const {config,input,logic,util}=silo
input.block=evt=>evt.preventDefault()

input.colorAdd=function(evt)
{
	const 
	editor=util.evt2customEl(evt),
	rgb=Array(3).fill(1).map(_=>Math.floor(Math.random()*256))
	logic.colorAdd(editor.state,'rgb('+rgb.join(',')+')',evt.button)
}
input.colorEdit=({target},{state})=>logic.colorSet(state,target.value)
input.colorSelect=function(evt,editor=util.evt2customEl(evt))
{
	const
	{button,target}=evt,//primary, secondary, etc. [0=left click,1=wheel,2=right]
	id=parseInt(target.getAttribute('data-color'))
	logic.colorSelect(editor.state,id,button)
}
//canvas events
input.pointerup=input.pointerdown=function(evt,editor)
{
	const
	{x,y}=util.evt2coords(evt),
	{pointerId:id,pressure}=evt
	editor.state.view.pointers[id].pressure=pressure
	if(pressure) logic.draw(editor.state,x,y,evt.button)
}
input.pointerout=function({pointerId:id},editor)
{
	delete editor.state.view.pointers[id]
}
input.pointerover=function(evt,editor)
{
	const
	{x,y}=util.evt2coords(evt),
	{pointerId:id,pressure}=evt
	editor.state.view.pointers[id]={id,pressure,x,y}
}
input.pointermove=function(evt,editor)
{
	const
	{x,y}=util.evt2coords(evt),
	{pointerId:id,pressure}=evt
	Object.assign(editor.state.view.pointers[id],{pressure,x,y})
	if(pressure) logic.draw(editor.state,x,y,util.evt2buttons(evt)[0])
}
export default silo