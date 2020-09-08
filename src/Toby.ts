import { LoadImage } from "./LoadImage";
import { Draggable } from "./Draggable";

export class Toby {

    position = new Float32Array(2);
    speed = new Float32Array(2);
    direction = new Float32Array(2);
    size = 50;

    isDragging: boolean = false;
    draggable: Draggable = Draggable.None;

    img: HTMLImageElement;

    constructor() {
        this.position[0] = 500;
        this.position[1] = 500;

        this.speed[0] = 0;
        this.speed[1] = 0;
    }

    async LoadAsync() {
        this.img = await LoadImage('CharacterCatGirl.png');
        //document.body.appendChild(this.img);
    }

}
