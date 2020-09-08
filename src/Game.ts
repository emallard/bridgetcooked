import { MoveController } from "./MoveController";
import { Level } from "./Level";
import { Toby } from "./Toby";
import { LevelBuilder } from "./LevelBuilder";


export class Game {

    toby: Toby;
    level: Level;
    moveController: MoveController;

    async LoadAsync() {

        let levelBuilder = new LevelBuilder();
        await levelBuilder.LoadAsync();
        this.level = levelBuilder.CreateLevel();

        this.toby = new Toby();
        await this.toby.LoadAsync();
        this.level.container.appendChild(this.toby.img);

        this.moveController = new MoveController();
        this.moveController.Load();
    }

    tmpPosition = new Float32Array(2);
    Update() {

        this.moveController.GetSpeed(this.toby.speed);

        this.tmpPosition[0] = this.toby.position[0] + this.toby.speed[0];
        this.tmpPosition[1] = this.toby.position[1] + this.toby.speed[1];

        if (this.level.CanMove(this.tmpPosition)) {
            this.toby.position[0] = this.tmpPosition[0];
            this.toby.position[1] = this.tmpPosition[1];
        }

        this.toby.img.style.left = (window.innerWidth / 2 - 50) + 'px';
        this.toby.img.style.top = (window.innerHeight / 2 - 139) + 'px';
        this.toby.img.style.position = 'fixed';
        this.toby.img.style.zIndex = '' + (Math.round(this.toby.position[1]) + 40);

        this.level.container.style.left = (-this.toby.position[0] + (window.innerWidth / 2)) + 'px';
        this.level.container.style.top = (-this.toby.position[1] + (window.innerHeight / 2)) + 'px';


        this.moveController.UpdateGraphics();
        //this.tobyPosition[0] += this.tobySpeed[0];
        //this.tobyPosition[1] += this.tobySpeed[1];
    }
}


