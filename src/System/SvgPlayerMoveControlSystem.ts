import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { DbEntity } from "../Db/DbEntity";


export class SvgPlayerMoveControl extends DbEntity {
    cx: number;
    cy: number;

    touchx: number;
    touchy: number;
    r = 50;

    svg: SVGSVGElement;
    cir1: SVGCircleElement;
}

export class SvgPlayerMoveControlSystem implements IUpdatable {

    app: App;


    Configure(app: App) {
        this.app = app;


        app.db.OnInserted(PlayerMoveControl, c => {
            app.db.Insert(this.CreateSvg());
        });

        app.db.OnUpdated(SvgPlayerMoveControl, c => {
            let playerMoveControl = app.db.First(PlayerMoveControl);
            playerMoveControl.touchX = c.touchx;
            playerMoveControl.touchY = c.touchy;

            app.db.Update(playerMoveControl);
        })
    }

    CreateSvg(): SvgPlayerMoveControl {

        let svgControl = new SvgPlayerMoveControl();
        svgControl.cx = 100;
        svgControl.cy = 200;
        svgControl.touchx = svgControl.cx;
        svgControl.touchy = svgControl.cy;

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.position = 'fixed';
        svg.style.top = '0px';
        svg.style.left = '0px';


        const cirBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cirBack.setAttribute("cx", '' + svgControl.touchx);
        cirBack.setAttribute("cy", '' + svgControl.touchy);
        cirBack.setAttribute("r", '' + svgControl.r);
        cirBack.setAttribute("stroke", "red");

        // attach it to the container
        svg.appendChild(cirBack);

        svgControl.cx = svgControl.touchx;
        svgControl.cy = svgControl.touchy;

        svgControl.cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgControl.cir1.setAttribute("cx", '' + svgControl.touchx);
        svgControl.cir1.setAttribute("cy", '' + svgControl.touchy);
        svgControl.cir1.setAttribute("r", "30");
        svgControl.cir1.setAttribute("fill", "red");

        // attach it to the container
        svg.appendChild(svgControl.cir1);

        svg.addEventListener('touchmove', (evt: TouchEvent) => {

            //console.log('touch move');

            var touch = evt.touches[0];

            var rect = svg.getBoundingClientRect();
            svgControl.touchx = touch.clientX - rect.left; //x position within the element.
            svgControl.touchy = touch.clientY - rect.top; //y position within the element.

            svgControl.cir1.setAttribute("cx", '' + svgControl.cx);
            svgControl.cir1.setAttribute("cy", '' + svgControl.cy);

            this.app.db.Update(svgControl);
        });

        svg.addEventListener('touchend', (evt: TouchEvent) => {

            svgControl.touchx = svgControl.cx;
            svgControl.touchy = svgControl.cy;

            svgControl.cir1.setAttribute("cx", '' + svgControl.cx);
            svgControl.cir1.setAttribute("cy", '' + svgControl.cy);

            this.app.db.Update(svgControl);
        });

        document.body.appendChild(svg);
        this.DoResize(svg);

        return svgControl;

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

    Update(dt: number) {

    }

}