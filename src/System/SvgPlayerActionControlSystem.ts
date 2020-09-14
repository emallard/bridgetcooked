import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerAction } from "../Blocks/PlayerAction";
import { DbEntity } from "../Db/DbEntity";
import { SvgRoot } from "./SvgRootSystem";

export class SvgPlayerActionControl extends DbEntity {
    cx: number;
    cy: number;
    r = 50;

    svg: SVGSVGElement;
    circle: SVGCircleElement;
    isDown: boolean;
}


export class SvgPlayerActionControlSystem implements IUpdatable {

    app: App;


    Configure(app: App) {
        this.app = app;

        app.db.OnInserted(PlayerAction, c => {
            let svgRoot = app.db.First(SvgRoot);
            app.db.Insert(this.CreateSvg(svgRoot));
        });

        app.db.OnUpdated(SvgPlayerActionControl, c => {
            let playerAction = app.db.First(PlayerAction);
            app.db.Update(playerAction);
        })
    }

    CreateSvg(svgRoot: SvgRoot): SvgPlayerActionControl {

        console.log('coucou');
        let svg = svgRoot.svg;

        let svgControl = new SvgPlayerActionControl();
        svgControl.cx = window.innerWidth - 100;
        svgControl.cy = 200;

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", '' + svgControl.cx);
        circle.setAttribute("cy", '' + svgControl.cy);
        circle.setAttribute("r", '' + svgControl.r);
        circle.setAttribute("stroke", "blue");
        circle.setAttribute("fill", "transparent");

        // attach it to the container
        svg.appendChild(circle);
        svgControl.circle = circle;

        circle.addEventListener('touchstart', (evt: TouchEvent) => {
            svgControl.circle.setAttribute("fill", 'blue');
            this.app.db.Update(svgControl);
        });

        circle.addEventListener('touchend', (evt: TouchEvent) => {
            svgControl.circle.setAttribute("fill", "transparent");
        });

        return svgControl;
    }


    Update(dt: number) {
    }
}
