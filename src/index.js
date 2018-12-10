import silo from './node_modules/silo/index.js'
import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'

const {config,util,logic,output,input}=silo

export default silo(async function pixel(url='/node_modules/pixel-editor/')
{
	await util.mkCustomEl(url,'pixel-editor',pixel.editor)
	await color()
})
pixel.editor=class extends silo.customElement
{
	constructor(state={})
	{
		super(state,silo)

		this.ctx=this.shadowRoot.querySelector('canvas').getContext('2d')
		this.ctx.imageSmoothingEnabled=false
	}
}