import Experience from "./Experience.js"

export default class Camera
{
    constructor()
    {
        // /* Problem: Need access to experience*/
        // // Global variable (simplest but most disliked)
        // this.experience=window.experience
        // console.log(this.experience.sizes.width) 

        // // From parameter (only issue: you have to send & save lots of parameter, can get confusing)
        // this.experience = experience
        // console.log(this.experience.sizes.width)

        // Using singleton (most complex but cleanest)
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        console.log(this)


    }
}