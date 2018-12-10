import color from './node_modules/color-picker/index.mjs'
import silo from './output.mjs'
const
{config,input,logic,output,util}=silo,
{truth,v}=util
export default async function pixel(url='/node_modules/pixel-editor/')
{
	await util.mkCustomEl(url,'pixel-editor',pixel.editor)
	await color()
}
Object.assign(pixel,silo)
pixel.editor=class extends silo.viewer
{
	constructor(state={})
	{
		super(state,silo)

		this.ctx=this.shadowRoot.querySelector('canvas').getContext('2d')
		this.ctx.imageSmoothingEnabled=false
	}
}