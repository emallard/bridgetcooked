import { LoadImage } from "./LoadImage";
import { Draggable } from "./Draggable";

export class Toby {

    position = new Float32Array(2);
    speed = new Float32Array(2);
    direction = new Float32Array(2);
    size = 50;

    isDragging: boolean = false;
    draggable: Draggable = Draggable.None;

    imgDown: HTMLImageElement;
    imgUp: HTMLImageElement;
    imgLeft: HTMLImageElement;
    imgRight: HTMLImageElement;

    constructor() {
        this.position[0] = 500;
        this.position[1] = 500;

        this.speed[0] = 0;
        this.speed[1] = 0;
    }

    async LoadAsync() {
        this.imgDown = await LoadImage('CharacterCatGirlDown.png');
        this.imgUp = await LoadImage('CharacterCatGirlUp.png');
        this.imgLeft = await LoadImage('CharacterCatGirlLeft.png');
        this.imgRight = await LoadImage('CharacterCatGirlRight.png');
        //document.body.appendChild(this.img);



    }

    SetImageFromSpeed() {

        if (this.speed[0] == 0 && this.speed[1] == 0)
            return;

        this.imgDown.style.display = 'none';
        this.imgUp.style.display = 'none';
        this.imgLeft.style.display = 'none';
        this.imgRight.style.display = 'none';


        let img = this.imgDown;
        if (this.speed[0] > 0 && Math.abs(this.speed[0]) > Math.abs(this.speed[1]))
            img = this.imgRight;

        if (this.speed[0] < 0 && Math.abs(this.speed[0]) > Math.abs(this.speed[1]))
            img = this.imgLeft;

        if (this.speed[1] > 0 && Math.abs(this.speed[1]) > Math.abs(this.speed[0]))
            img = this.imgDown;
        if (this.speed[1] < 0 && Math.abs(this.speed[1]) > Math.abs(this.speed[0]))
            img = this.imgUp;

        img.style.display = 'block';
        img.style.left = (window.innerWidth / 2 - 50) + 'px';
        img.style.top = (window.innerHeight / 2 - 139) + 'px';
        img.style.position = 'fixed';
        img.style.zIndex = '' + (Math.round(this.position[1]) + 40);
    }
}
