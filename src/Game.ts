import { LoadImage } from "./LoadImage";
import { MoveController } from "./MoveController";
import { Level } from "./Level";


export class Game {

    toby: Toby;
    level: Level;
    moveController: MoveController;

    async LoadAsync() {


        this.level = new Level();
        await this.level.LoadAsync();

        this.toby = new Toby();
        await this.toby.LoadAsync();

        this.moveController = new MoveController();
        this.moveController.Load();
    }

    Update() {

        this.moveController.GetSpeed(this.toby.speed);

        this.toby.position[0] += Math.sign(this.toby.speed[0]);
        this.toby.position[1] += Math.sign(this.toby.speed[1]);

        this.toby.img.style.left = '300' + 'px';
        this.toby.img.style.top = '150' + 'px';

        this.level.container.style.left = (-this.toby.position[0] + (window.innerWidth / 2)) + 'px';
        this.level.container.style.top = (-this.toby.position[1] + (window.innerHeight / 2)) + 'px';


        this.moveController.UpdateGraphics();
        //this.tobyPosition[0] += this.tobySpeed[0];
        //this.tobyPosition[1] += this.tobySpeed[1];
    }
}

export class Toby {

    position = new Float32Array(2);
    speed = new Float32Array(2);

    img: HTMLImageElement;

    constructor() {
        this.position[0] = 0;
        this.position[1] = 0;

        this.speed[0] = 0;
        this.speed[1] = 0;
    }
    async LoadAsync() {
        this.img = await LoadImage('kiwi.png');
        this.img.style.position = 'fixed';
        this.img.style.left = '300' + 'px';
        this.img.style.top = '150' + 'px';

        document.body.appendChild(this.img);
    }
}


