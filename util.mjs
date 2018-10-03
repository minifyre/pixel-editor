const util=
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
util.evt2buttons=function({buttons})
{
	return Object.entries(
	{
		32:5,//pen & eraser
		16:4,//forward
		8:3,//back
		4:1,//right click
		2:2,//mouse wheel
		1:0//left click
	})
	.reduce(function(obj,[num,buttonType])
	{
		if(obj.total>=num)
		{
			obj.btns.unshift(buttonType)
			obj.total-=num
		}
		return obj
	},{btns:[],total:buttons}).btns
}
util.evt2customEl=({path})=>path.find(x=>(x.tagName||'').match('-'))
export default util