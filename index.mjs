import silo from './output.mjs'
import color from './node_modules/color-picker/index.mjs'
const
{config,input,logic,output,util}=silo,
{truth,v}=util
export default async function pixel(url='/node_modules/pixel-editor/')
{
	await silo(url,'pixel-editor',pixel.editor)
	await color()
}
Object.assign(pixel,silo)
pixel.editor=class extends silo.viewer
{
	constructor(state={})
	{
		super(state)
		let renderer=x=>x
		this.state=truth(logic(state),(...args)=>renderer(args))
		renderer=v.render(this.shadowRoot,this,output)

		this.ctx=this.shadowRoot.querySelector('canvas').getContext('2d')
		this.ctx.imageSmoothingEnabled=false
	}
}