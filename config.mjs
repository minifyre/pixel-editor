import silo from './node_modules/pane-viewer/index.mjs'
const {config}=silo
config.state=
{
	file:
	{
		palette:['#000','#fff','#f00'],
		pts:{}
	},
	view:
	{
		editColor:-1,
		pointers:{},
		selectedColors:{0:0},
		viewbox:{height:150,width:300,x:0,y:0}
		//@todo get dimensions into state.view & have viewbox default to those
	}
}
export default silo