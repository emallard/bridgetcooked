import { LoadImage } from "./LoadImage";
import { Game } from "./Game";
import { disableBodyScroll } from 'body-scroll-lock';
import { App } from "./App";
import { MoveSystem } from "./System/MoveSystem";
import { Tob } from "./Blocks/Tob";
import { Floor } from "./Blocks/Floor";
import { Supply } from "./Blocks/Supply";
import { GraphicsSystem } from "./System/GraphicsSystem";
import { SvgPlayerMoveControlSystem } from "./System/SvgPlayerMoveControlSystem";
import { ThreeSystem } from "./System/ThreeSystem";
import { ThreeGraphicsSpriteSystem } from "./System/ThreeGraphicsSpriteSystem";
import * as THREE from "three";

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

    console.log('happy birthday bridget');


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


    /*
    let game = new Game();
    await game.LoadAsync();
    setInterval(() => game.Update());
    */

    let app = new App();
    app.CreateNoDom();
    //app.db.logLevel = 2;


    new GraphicsSystem().Configure(app);
    new MoveSystem().Configure(app);
    new SvgPlayerMoveControlSystem().Configure(app);
    new ThreeSystem().Configure(app);
    new ThreeGraphicsSpriteSystem().Configure(app);


    let toby = new Tob();
    toby.x = 0;
    toby.y = 0;
    app.db.Insert(toby);


    function Test1() {
        for (let x = 0; x < 10; ++x) {
            let floor = new Floor();
            floor.url = 'StoneBlock.png';
            floor.x = x * 100;
            floor.y = 0;
            app.db.Insert(floor);
        }

        let supply = new Supply();
        supply.x = 0;
        supply.y = 200;
        app.db.Insert(supply);
    }

    Test1();

    var clock = new THREE.Clock();
    function update() {
        //requestAnimationFrame(update);

        let delta = clock.getDelta();
        app.Update(delta);
    }

    setInterval(update, 0);
}


export function drawImg() {

}

