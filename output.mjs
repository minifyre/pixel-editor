import silo from './logic.mjs'
import v from './node_modules/v/v.mjs'
const {config,logic,util}=silo
function output(editor)
{
	const
	{palette,pointers,viewbox}=editor.state,
	{height,width}=viewbox,
	on={},
	handler=evt=>silo.input(evt,editor),
	colors=Object.values(palette)
	.map(color=>v('button',{style:`background-color:${color}`})),
	{x,y}=[...Object.values(pointers),viewbox][0]

	'over,down,move,up,out'
	.split(',')
	.forEach(type=>on[`pointer${type}`]=handler)

	return [v('style',{},config.css),
		v('.coords.ui',{},x+','+y),
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
silo.output=output
silo.v=v
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
export default silo