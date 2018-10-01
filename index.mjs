import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'
const
config={},
util=
{
	evt:(fn,types,...args)=>types.split(',').forEach(type=>fn(type,...args)),
	importFiles:paths=>Promise.all(paths.map(x=>fetch(x).then(x=>x.text()))),
	off:(el,...args)=>util.evt(el.removeEventListener,...args),
	on:(el,...args)=>util.evt(el.addEventListener,...args)
}

config.state=
{
	cursor:{x:0,y:0},
	palette:['#000'],
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
		this.dom=output(this.state)
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
function output({cursor,palette,viewbox})
{
	const
	{height,width}=viewbox,
	colors=Object.values(palette)
	.map(color=>v('button',{style:`background-color:${color}`}))
	return [v('style',{},config.css),
		v('div.coords',{},cursor.x+','+cursor.y),
		v('header.tools',{},
			v('button',{},'pencil')
		),
		v('footer.palette',{},
			...colors,
			v('button',{},'+')
		),
		v('canvas',{height,on:{pointerdown:input},width})
	]
}
output.render=function({ctx,dom,state,shadowRoot})
{
	const {height,width}=state.viewbox
	ctx.clearRect(0,0,height,width)
	Object.entries(state.pts)
	.forEach(function([coords,paletteIndex])
	{
		const
		color=state.palette[paletteIndex],
		[x,y]=coords.split(',').map(num=>parseInt(num))
		Object.assign(ctx,{fillStyle:color}).fillRect(x,y,1,1)
	})
	v.flatUpdate(shadowRoot,dom)
}
function input(evt)
{
	const
	{on,off}=util,
	{target:el}=evt,
	editor=evt.path.find(x=>(x.tagName||'').toLowerCase()==='pixel-editor'),
	drawPt=({layerX:x,layerY:y})=>editor.state.pts[x+','+y]=0,//@todo allow other colors
	cleanup=function()
	{
		off(el,'pointerdown,pointermove',drawPt)
		off(el,'pointerup',cleanup)
		on(el,'pointerdown',input)
	},
	setup=function()
	{
		off(el,'pointerdown',input)
		on(el,'pointerdown,pointermove',drawPt)
		on(el,'pointerup',cleanup)
	}
	setup()
	drawPt(evt)
}