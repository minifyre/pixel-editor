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
	pallet:['#000'],
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
		const shadow=this.attachShadow({mode:'open'})
		this.state=truth(logic(state),()=>output.render(this))
		this.dom=output(this.state)
		v.flatUpdate(shadow,this.dom)
		this.ctx=Object.assign(shadow.querySelector('canvas').getContext('2d'),{imageSmoothingEnabled:false})
		//@todo copy resize observer from code-editor & integrate it here
	}
}
function logic(state)
{
	return Object.assign({},config.state,state)
}
function output({viewbox})
{
	const {height,width}=viewbox
	return [v('style',{},config.css),
		v('canvas',{height,on:{pointerdown:input},width})
	]
}
output.render=function({ctx,state})
{
	const {height,width}=state.viewbox
	ctx.clearRect(0,0,height,width)
	Object.entries(state.pts)
	.forEach(function([coords,palletIndex])
	{
		const
		color=state.pallet[palletIndex],
		[x,y]=coords.split(',').map(num=>parseInt(num))
		Object.assign(ctx,{fillStyle:color}).fillRect(x,y,1,1)
	})
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