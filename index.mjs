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
pixel.editor=class extends HTMLElement
{
	constructor(state={})
	{
		super()
		const
		shadow=this.attachShadow({mode:'open'})
		let renderer=x=>x
		this.state=truth(logic(state),(...args)=>renderer(args))
		renderer=v.render(shadow,this,output)
		//@todo find a better way to set this (render needs access to it, but canvas only exists after first render)
		this.ctx=Object.assign(shadow.querySelector('canvas').getContext('2d'),{imageSmoothingEnabled:false})
	}
}