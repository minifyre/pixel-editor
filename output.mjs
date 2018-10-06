import silo from './input.mjs'
const
{config,input,logic,util}=silo,
{v}=util
function output(editor)
{
	const
	{editColor,palette,pointers,selectedColors,viewbox}=editor.state,
	{height,width}=viewbox,
	on={contextmenu:input.block},
	handler=evt=>silo.input(evt,editor),
	colors=Object.values(palette)
	.map(function(color,id)
	{
		const
		data={color:id},
		on={contextmenu:input.block,pointerup:input.colorSelect},
		style=`background-color:${color};`,
		type=	Object
				.entries(selectedColors)
				.filter(([type,colorId])=>colorId===id)
				.map(([type])=>type)
				.join(',')
		return v('button',{data,on,style},type)
	}),
	{x,y}=[...Object.values(pointers),viewbox][0]

	'over,down,move,up,out'.split(',').map(x=>`pointer${x}`)
	.forEach(fn=>on[fn]=evt=>input[fn](evt,editor))

	const [modal,edit]=editColor===-1?	[{hidden:'hidden'},{}]:
										[{},{value:palette[editColor]}]
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
		v('.modal',modal,
			v('color-picker',{...edit,on:{change:evt=>input.colorEdit(evt,editor)}})
		)
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
	v.flatUpdate(shadowRoot,newDom,editor.dom)
	editor.dom=newDom
}
export default Object.assign(silo,{output})