import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { DbEntity } from "../Db/DbEntity";


export class SvgRoot extends DbEntity {
    svg: SVGSVGElement;
}


export class SvgRootSystem implements IUpdatable {
    app: App;

    Configure(app: App) {
        this.app = app;

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.position = 'fixed';
        svg.style.top = '0px';
        svg.style.left = '0px';
        this.DoResize(svg);
        window.addEventListener('resize', () => {
            this.DoResize(svg);
        });

        document.getElementById('movecontrol_container').appendChild(svg);

        let svgRoot = new SvgRoot();
        svgRoot.svg = svg;

        app.db.Insert(svgRoot);
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