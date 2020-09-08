import { LoadImage } from "./LoadImage";
import { disableBodyScroll } from "body-scroll-lock";

export class Level {

    grass: HTMLImageElement;
    wood: HTMLImageElement;
    stone: HTMLImageElement;

    container: HTMLDivElement;

    async LoadAsync() {

        this.grass = await LoadImage('GrassBlock.png');
        this.wood = await LoadImage('WoodBlock.png');
        this.stone = await LoadImage('StoneBlock.png');

        this.container = document.createElement('div');

        document.body.appendChild(this.container);
        this.container.style.position = 'fixed';

        let dy = 80;
        this.AddRow(this.grass, 0);
        this.AddRow(this.wood, dy);
        this.AddRow(this.stone, 2 * dy);
        this.AddRow(this.grass, 3 * dy);
        this.AddRow(this.wood, 4 * dy);
        this.AddRow(this.stone, 5 * dy);
        //console.log('disableBodyScroll');
        //disableBodyScroll(this.container);
    }

    AddRow(img: HTMLImageElement, y: number) {
        for (let i = 0; i < 20; ++i) {
            let clone: HTMLImageElement = <HTMLImageElement>img.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = y + 'px';
            clone.style.left = (i * 100) + 'px';
            this.container.appendChild(clone);
        }
    }

}
