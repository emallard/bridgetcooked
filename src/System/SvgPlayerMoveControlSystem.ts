import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { DbEntity } from "../Db/DbEntity";
import { SvgRoot } from "./SvgRootSystem";


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
            let svgRoot = app.db.First(SvgRoot);
            app.db.Insert(this.CreateSvg(svgRoot));
        });

        app.db.OnUpdated(SvgPlayerMoveControl, c => {
            let playerMoveControl = app.db.First(PlayerMoveControl);
            playerMoveControl.touchX = c.touchx;
            playerMoveControl.touchY = c.touchy;

            app.db.Update(playerMoveControl);
        })
    }

    CreateSvg(svgRoot: SvgRoot): SvgPlayerMoveControl {

        let svg = svgRoot.svg;

        let svgControl = new SvgPlayerMoveControl();
        svgControl.cx = 100;
        svgControl.cy = 200;
        svgControl.touchx = svgControl.cx;
        svgControl.touchy = svgControl.cy;

        const cirBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cirBack.setAttribute("cx", '' + svgControl.cx);
        cirBack.setAttribute("cy", '' + svgControl.cy);
        cirBack.setAttribute("r", '' + svgControl.r);
        cirBack.setAttribute("stroke", "red");
        cirBack.setAttribute("fill", "transparent");
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

            svgControl.cir1.setAttribute("cx", '' + svgControl.touchx);
            svgControl.cir1.setAttribute("cy", '' + svgControl.touchy);

            this.app.db.Update(svgControl);
        });

        svg.addEventListener('touchend', (evt: TouchEvent) => {

            svgControl.touchx = svgControl.cx;
            svgControl.touchy = svgControl.cy;

            svgControl.cir1.setAttribute("cx", '' + svgControl.cx);
            svgControl.cir1.setAttribute("cy", '' + svgControl.cy);

            this.app.db.Update(svgControl);
        });

        return svgControl;

    }



    Update(dt: number) {

    }

}