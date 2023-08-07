import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if (instance)
        {
            return instance
        }
        instance = this

        //Global access
        window.experience=this

        //Options
        this.canvas = canvas

        //Setup
        this.sizes=new Sizes()
        this.time = new Time()
        this.scene - new THREE.Scene()
        this.camera = new Camera()

        //Siezes resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        //Time Tick Event
        this.time.on('tick', ()=>
        {
            this.update()
        })

    }
    resize()
    {
        console.log("resize happening")
    }

    update()
    {

    }
}