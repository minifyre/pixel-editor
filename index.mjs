import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'
const
config={},
util=
{
	importFiles:paths=>Promise.all(paths.map(x=>fetch(x).then(x=>x.text())))
}
util.evt2coords=function(evt)
{
	const
	{target:img}=evt,
	[can]=img.getClientRects(),
	[x,y]=
	[
		(evt.pageX-can.x)*(img.width/can.width),
		(evt.pageY-can.y)*(img.height/can.height)
	]
	.map(num=>Math.abs(Math.round(num)))
	return {x,y}
}

config.state=
{
	palette:['#000'],
	pointers:{},
	pts:{},
	viewbox:{height:150,width:300,x:0,y:0}
}
export default async function pixel(url='/node_modules/pixel-editor/')
{
	const
	[css]=await util.importFiles([url+'index.css'])
	config.css=css
	customElements.define('pixel-editor',pixel.editor)
}
pixel.editor=class extends HTMLElement
{
	constructor(state={})
	{
		super()
		const
		shadow=this.attachShadow({mode:'open'}),
		initalState=logic(state)
		let renderer=x=>x
		this.state=truth(initalState,(...args)=>renderer(args))
		this.dom=output(this)
		v.flatUpdate(shadow,this.dom)
		renderer=()=>output.render(this)
		this.ctx=Object.assign(shadow.querySelector('canvas').getContext('2d'),{imageSmoothingEnabled:false})
		//@todo copy resize observer from code-editor & integrate it here
	}
}
function logic(state)
{
	return Object.assign({},config.state,state)
}
function output(editor)
{
	const
	{palette,viewbox}=editor.state,
	{height,width}=viewbox,
	on={},
	handler=evt=>input(evt,editor),
	colors=Object.values(palette)
	.map(color=>v('button',{style:`background-color:${color}`}))

	'over,down,move,up,out'
	.split(',')
	.forEach(type=>on[`pointer${type}`]=handler)

	return [v('style',{},config.css),
		v('.coords.ui',{},','),
		v('header.tools.ui',{},
			v('button',{},'pencil')
		),
		v('footer.palette.ui',{},
			...colors,
			v('button',{},'+')
		),
		v('canvas',{height,on,width})
	]
}
output.render=function(editor)
{
	const 
	{ctx,state,shadowRoot}=editor,
	{height,width}=state.viewbox
	ctx.clearRect(0,0,height,width)
	Object.entries(state.pts)
	.forEach(function([coords,paletteIndex])
	{
		const
		color=state.palette[paletteIndex],
		[x,y]=coords.split(',').map(num=>parseInt(num))
		Object.assign(ctx,{fillStyle:color}).fillRect(x,y,1,1)
	})
	const newDom=output(editor)
	v.flatUpdate(shadowRoot,editor.dom,newDom)
	editor.dom=newDom
}
function input(evt,editor)
{
	input[evt.type](evt,editor)
}
input.pointerup=input.pointerdown=function({pointerId:id,pressure},editor)
{
	editor.state.pointers[id].pressure=pressure
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
	//@todo allow different tools
	if(pressure) editor.state.pts[x+','+y]=0//@todo allow different colors
}