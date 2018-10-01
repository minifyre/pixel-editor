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
export default util