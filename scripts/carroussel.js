class Carousel{

    /**
     * this callback type is called `requestCallback` ans is displayed as a global symbol
     * @callbaxk moveCallback
     * @param {number} index 
     */

    /**
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll Nombre element a faire defiler
     * @param {Object} options.slidesVisible Nombre element visible dans une slide
     * @param {boolean} opyions.infinite Slide infini
     * @param {boolean} options.loop Boucler en fin de slide
     * @param {Object} options.time Temps de slide en slide en 's'
     */

 
    constructor( element, options = {}) {
        this.element = element
        this.options = Object.assign({} ,{
            slidesToScroll : 1,
            slidesVisible : 1,
            loop: false,
            infinite : false,
            // time : 3
            click : false,
        } , options)
        // debugger
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentSlide = 0
        this.moveCallback = []

        
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
       
        this.items = children.map((child) =>{
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            return item
        })

        if (this.options.infinite){
            this.offset = this.options.slidesVisible * 2 - 1
            this.items = [
             ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)) ,
             ...this.items,
             ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
            ]
            this.gotoItem(this.offset, false)
        }
        this.items.forEach(item => this.container.appendChild(item))
        this.setStyle()
        this.createNavigation()

        // Evenement
        this.moveCallback.forEach(cb => cb(this.currentSlide))
        this.onResize()
        window.addEventListener('resize', this.onResize.bind(this))
        this.root.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key === 'Right'){
                this.next()
            }
            else if (e.key === 'ArrowLeft' || e.key === 'Left'){
                this.prev()
            }
        })
        if (this.options.infinite){
        this.container.addEventListener('transitionend', this.resetInfinite.bind(this))
    }
        // debugger
    }
    /**
     * Applique les bonnes dimensions aux elements de carousel
     */
    
    setStyle (){
        // console.log("style")
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100)+ "%"
        this.items.forEach(item => item.style.width= ((100 / this.slidesVisible )/ ratio) + "%")
    }

    createNavigation(){

        const rightArrow = document.querySelector('.right-arrow')
        const leftArrow = document.querySelector('.left-arrow')
        rightArrow.addEventListener('click', this.next.bind(this)
        )
        leftArrow.addEventListener('click', this.prev.bind(this)
        )
        if (this.options.loop === true){
            return
        }
    }

    next(){
        this.gotoItem(this.currentSlide + this.slidesToScroll)
        this.options.click = true
        // console.log( this.options.click)
    }
    prev(){
        this.gotoItem(this.currentSlide - this.slidesToScroll)
        this.options.click = true
        // console.log( this.options.click)
    }
    /**
     * deplace le slider vers l'element ciblé
     * @param {number} index 
     * @param {boolean} [animation = true]
     */
    
    gotoItem (index, animation = true){
        // console.log("got")
        //debugger
        if (index<0){
            if (this.options.loop){
                index = this.items.length - this.slidesVisible
            }else{
                // console.log('return')
                return
            }
        } else if (index >= this.items.length || (this.items[this.currentSlide + this.slidesVisible] === undefined && index > this.currentSlide)) {
            if (this.options.loop){
                index = 0
            }else{
                // console.log('return2')
                return
            }
        }
        let translateX = index * -100 /this.items.length 
        if (animation === false){
            this.container.style.transition = 'none'
        }
        this.container.style.transform = 'translate3d('+ translateX +'%,0,0)'
        this.container.offsetHeight // force repaint
        if (animation === false){
            this.container.style.transition = ''
        }
        this.currentSlide = index
        this.moveCallback.forEach(cb => cb(index))
    }

    /**
     * deplace le container pour donner l'effet infini
     */
    resetInfinite() {
        // console.log('currentSlide', this.currentSlide, '<= slidesToScroll', this.options.slidesToScroll)
         if (this.currentSlide <= this.options.slidesToScroll) {
             this.gotoItem(this.currentSlide + (this.items.length - 2 * this.offset), false)
         } else if (this.currentSlide >= this.items.length - this.offset){
            this.gotoItem(this.currentSlide - (this.items.length - 2 * this.offset), false)
         }
    }

    
    /**
     * 
     * @param {moveCallback} cb 
     */

    onMove (cb){
        this.moveCallback.push(cb)
    }

    onResize(){
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle()
            this.moveCallback.forEach(cb => cb(this.currentSlide))
        }
    }
    // Playslide() --> pour faire bouger le slider en X temps

    // playSlide(){
    //     // console.log('1',this.options.click)
    //     let action
    //     if(this.options.click === false){
    //     action = setInterval(() => {
    //         if(this.options.click === false){
    //         // console.log('2',this.options.click)
    //         // console.log(this.currentSlide + this.slidesToScroll)
    //         this.gotoItem(this.currentSlide + this.slidesToScroll)
    //     }
    //     if (this.options.click === true ){
    //         // console.log('3',this.options.click)
    //         this.options.click = false
    //     }
    //     }, 6000)
    // }
        // if (this.options.click === true){
        //     console.log('hbi2')
        //     console.log( this.options.click)
        //     clearInterval(action)
        // }
//}  
    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement}
     */

/**
 * returns {number}
 */

get slidesToScroll(){
    return this.isMobile ? 1 : this.options.slidesToScroll
}
get slidesVisible(){
    return this.isMobile ? 1 : this.options.slidesVisible
}


    createDivWithClass (className){
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

}

document.addEventListener('DOMContentLoaded', function() {

    new Carousel(document.querySelector('.slider__slider-container'), {
         slidesToScroll : 4 ,
         slidesVisible : 4 ,
         infinite : true,
        //  time : 0,
    })
  })
