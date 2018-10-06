import silo from './output.mjs'
import color from './node_modules/color-picker/index.mjs'
const
{config,input,logic,output,util}=silo,
{truth,v}=util
export default async function pixel(url='/node_modules/pixel-editor/')
{
	await color()
	const
	[css]=await util.importFiles([url+'index.css'])
	config.css=css
	customElements.define('pixel-editor',pixel.editor)
}
Object.assign(pixel,silo)
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
		this.dom=output(this)
		v.flatUpdate(shadow,this.dom)
		renderer=()=>output.render(this)
		this.ctx=Object.assign(shadow.querySelector('canvas').getContext('2d'),{imageSmoothingEnabled:false})
		//@todo copy resize observer from code-editor & integrate it here
	}
}