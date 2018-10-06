import silo from './node_modules/pane-viewer/index.mjs'
const {config}=silo
config.state=
{
	editColor:-1,
	palette:['#000','#fff','#f00'],
	pointers:{},
	pts:{},
	selectedColors:{0:0},
	viewbox:{height:150,width:300,x:0,y:0}
}
export default silo