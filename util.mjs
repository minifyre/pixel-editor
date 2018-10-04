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
util.evt2buttons=function({buttons:total})
{
	const
	buttonMap=
	{
		32:5,//pen & eraser
		16:4,//forward
		8:3,//back
		4:1,//right click
		2:2,//mouse wheel
		1:0//left click
	},
	pressedBtnCodes=[]

	Object.keys(buttonMap)
	.map(key=>parseInt(key))
	.sort((a,b)=>b-a)
	.reduce(function(total,num)
	{
		if(total>=num)
		{
			pressedBtnCodes.unshift(num)
			total-=num
		}
		return total
	},total)
	const prssedBtns=pressedBtnCodes.map(key=>buttonMap[key])
	//1 is set as long as there is contact (even if not a left click)
	return prssedBtns.length>1?prssedBtns.filter(x=>x!==0):prssedBtns
}
util.evt2customEl=({path})=>path.find(x=>(x.tagName||'').match('-'))
export default util