import { LoadImage } from "./LoadImage";
import { Game } from "./Game";
import { disableBodyScroll } from 'body-scroll-lock';

function doResize(svg: SVGElement) {
    svg.style.backgroundColor = 'white';
    let margin = 5;
    // css margins to create something like a frame around the element
    // and prevent browsers from making scrollbars visible
    svg.style.marginLeft = margin + "px";
    svg.style.marginTop = margin + "px";

    // set svg dimensions
    svg.setAttribute('width', '' + (window.innerWidth - (margin * 2)));
    svg.setAttribute('height', '' + (window.innerHeight - (margin * 2)));
}


export async function newApp() {

    console.log('bridget');


    /*
    let img1 = await LoadImage('kiwi.png');
    

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //svg.style.width = '100%';
    //svg.style.height = '100%';
    document.body.appendChild(svg);
    doResize(svg);

    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir1.setAttribute("cx", "80");
    cir1.setAttribute("cy", "80");
    cir1.setAttribute("r", "30");
    cir1.setAttribute("fill", "red");

    // attach it to the container
    svg.appendChild(cir1);

    svg.addEventListener('touchmove', (evt: TouchEvent) => {

        var touch = evt.touches[0];

        var rect = svg.getBoundingClientRect();
        var x = touch.clientX - rect.left; //x position within the element.
        var y = touch.clientY - rect.top; //y position within the element.


        cir1.setAttribute("cx", '' + x);
        cir1.setAttribute("cy", '' + y);
    });
    */
    let game = new Game();
    await game.LoadAsync();
    setInterval(() => game.Update());


}


export function drawImg() {

}

