import { LoadImage } from "../LoadImage";
import { Draggable } from "../Draggable";

export class Toby {

    position = new Float32Array(2);
    speed = new Float32Array(2);
    direction = new Float32Array(2);
    size = 50;

    isDragging: boolean = false;
    draggable: Draggable = null;



    div: HTMLDivElement;

    imgDown: HTMLImageElement;
    imgUp: HTMLImageElement;
    imgLeft: HTMLImageElement;
    imgRight: HTMLImageElement;



    draggableImg: HTMLElement;


    constructor() {
        this.position[0] = 0;//500;
        this.position[1] = 0;//500;

        this.speed[0] = 0;
        this.speed[1] = 0;
    }

    async LoadAsync() {


        this.div = document.createElement('div');
        this.imgDown = await LoadImage('CharacterCatGirlDown.png');
        this.imgUp = await LoadImage('CharacterCatGirlUp.png');
        this.imgLeft = await LoadImage('CharacterCatGirlLeft.png');
        this.imgRight = await LoadImage('CharacterCatGirlRight.png');
        //document.body.appendChild(this.img);


        this.div.appendChild(this.imgUp);
        this.div.appendChild(this.imgDown);
        this.div.appendChild(this.imgLeft);
        this.div.appendChild(this.imgRight);
    }

    UpdateGraphics() {

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

        this.div.style.left = (window.innerWidth / 2 - 50) + 'px';
        this.div.style.top = (window.innerHeight / 2 - 139) + 'px';
        this.div.style.position = 'fixed';
        this.div.style.zIndex = '' + (Math.round(this.position[1]) + 40);



    }

    Drag(draggable: Draggable) {

        /*
        this.isDragging = true;
        this.draggable = draggable;
        let clone: HTMLImageElement = <HTMLImageElement>this.star.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.top = '-40px';
        this.div.appendChild(clone);
        */
    }
}
