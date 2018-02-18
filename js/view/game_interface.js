class GameInterface {
    constructor() {
        this.root = document.querySelector('#root')
        this.game = document.querySelector('#game')
        this.button = document.querySelector('#button')
        this.curW = 440 // width of game interface
        this.curH = 677 // height of game interface
        this.aspectRatio = this.curW / this.curH
        this.process = null
    }

    static new(...args) {
        return new this(...args)
    }

    getBrowserInterfaceSize() {
        var pageWidth = window.innerWidth;
        var pageHeight = window.innerHeight;

        if (typeof pageWidth != "number") {
            //在标准模式下面
            if (document.compatMode == "CSS1Compat" ) {
                pageWidth = document.documentElement.clientWidth;
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageWidth = document.body.clientWidth;
                pageHeight = window.body.clientHeight;
            }
        }
    
        return {
            pageWidth: pageWidth,
            pageHeight: pageHeight
        }
    }

    resize() {
        var r, g, b, w, h, p, size, scale
        r = this.root
        g = this.game
        b = this.button
        p = this.getBrowserInterfaceSize()
        w = p.pageWidth
        h = p.pageHeight
        log('available width:', w, 'avail height:', h)

        // 根据浏览器可用高度调整游戏界面
        if (h != this.curH) {
            var negSize, nextW, leftOffset, topOffset
            size = h / 677
            negSize = size - 1
            scale = `scale(${size})`
            nextW = 440 * size // 浏览器 height 对应的游戏所需最大宽度

            // 不需要调整界面部件大小的情况
            if ((h < this.curH && nextW < this.curW) || // 正在缩小
                (h > this.curH || nextW > this.curW)) { // 正在扩大
                r.style.width = `${nextW}px`
                this.curW = nextW

                leftOffset = 220 * negSize
                g.style.transform = b.style.transform = scale
                g.style.marginLeft = leftOffset + 50 + 'px'
                b.style.marginLeft = leftOffset + 'px'
            }

            g.style.marginTop = 200 * negSize + 30 * size + 'px'
            b.style.marginTop = 240 * negSize + 'px'

            this.process = null            
            this.curH = h
        }

        // 根据浏览器可用宽度调整游戏界面
        if (w < this.curH * this.aspectRatio) {
            r.style.width = '100%'

            if (w == this.curW) {
                return
            }
            
            size = w / 440
            negSize = size - 1
            scale = `scale(${size})`

            g.style.transform = b.style.transform = scale
            g.style.marginLeft = `${220 * negSize + 50}px`
            b.style.marginLeft = `${220 * negSize}px`
            this.curW = w
        } else {
            r.style.width = `${h * this.aspectRatio}px`
        }
    }
}