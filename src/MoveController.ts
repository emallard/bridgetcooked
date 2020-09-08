
export class MoveController {

    x: number = 100;
    y: number = 200;

    cx = 100;
    cy = 200;
    r = 50;

    cir1: SVGCircleElement;

    Load() {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        //svg.style.width = '100%';
        //svg.style.height = '100%';



        const cirBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cirBack.setAttribute("cx", '' + this.cx);
        cirBack.setAttribute("cy", '' + this.cy);
        cirBack.setAttribute("r", '' + this.r);
        cirBack.setAttribute("stroke", "red");

        // attach it to the container
        svg.appendChild(cirBack);

        this.x = this.cx;
        this.y = this.cy;

        this.cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.cir1.setAttribute("cx", '' + this.x);
        this.cir1.setAttribute("cy", '' + this.y);
        this.cir1.setAttribute("r", "30");
        this.cir1.setAttribute("fill", "red");

        // attach it to the container
        svg.appendChild(this.cir1);

        svg.addEventListener('touchmove', (evt: TouchEvent) => {

            var touch = evt.touches[0];

            var rect = svg.getBoundingClientRect();
            this.x = touch.clientX - rect.left; //x position within the element.
            this.y = touch.clientY - rect.top; //y position within the element.
        });

        svg.addEventListener('touchend', (evt: TouchEvent) => {
            console.log('touch stop');
            this.x = this.cx;
            this.y = this.cy;
        });

        document.body.appendChild(svg);
        this.DoResize(svg);
    }

    UpdateGraphics() {
        this.cir1.setAttribute("cx", '' + this.x);
        this.cir1.setAttribute("cy", '' + this.y);
    }

    GetSpeed(speed: Float32Array) {
        speed[0] = this.x - this.cx;
        speed[1] = this.y - this.cy;

        if (Math.abs(speed[0]) < 10)
            speed[0] = 0;


        if (Math.abs(speed[1]) < 10)
            speed[1] = 0;

    }

    private DoResize(svg: SVGElement) {
        svg.style.position = 'fixed';
        svg.style.backgroundColor = 'transparent';
        let margin = 5;
        // css margins to create something like a frame around the element
        // and prevent browsers from making scrollbars visible
        svg.style.marginLeft = margin + "px";
        svg.style.marginTop = margin + "px";

        // set svg dimensions
        svg.setAttribute('width', '' + (window.innerWidth - (margin * 2)));
        svg.setAttribute('height', '' + (window.innerHeight - (margin * 2)));
    }
}
