import silo from './input.mjs'
import v from './node_modules/v/v.mjs'
const {config,input,logic,util}=silo
function output(editor)
{
	const
	{palette,pointers,viewbox}=editor.state,
	{height,width}=viewbox,
	on={},
	handler=evt=>silo.input(evt,editor),
	colors=Object.values(palette)
	.map(function(color,id)
	{
		const
		data={color:id},
		on={contextmenu:input.block,pointerup:input.colorSelect},
		active=id===editor.state.color?'active':'inactive',
		style=`background-color:${color}`
		return v('button',{class:active,data,on,style})
	}),
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
			v('button',{on:{pointerup:input.colorAdd}},'+')
		),
		v('canvas',{height,on,width}),
		v('color-picker',{hidden:'hidden',on:{change:console.log}})
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
	v.flatUpdate(shadowRoot,newDom,editor.dom)
	editor.dom=newDom
}
export default silo