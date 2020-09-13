import { MoveController } from "./MoveController";
import { Level } from "./Level";
import { Toby } from "./Blocks/Toby";
import { LevelBuilder } from "./LevelBuilder";
import { ActionController } from "./ActionController";
import { ImageLoader } from "./LoadImage";


export class Game {

    toby: Toby;
    level: Level;
    moveController: MoveController;

    async LoadAsync() {

        await ImageLoader.instance.LoadAsync();

        let levelBuilder = new LevelBuilder();
        await levelBuilder.LoadAsync();
        this.level = levelBuilder.CreateLevel();

        this.toby = new Toby();
        await this.toby.LoadAsync();
        this.level.container.appendChild(this.toby.div);

        this.moveController = new MoveController();
        this.moveController.Load();

        await (new ActionController()).LoadAsync(this.level, this.toby);
    }

    tmpPosition = new Float32Array(2);
    Update() {

        this.moveController.GetSpeed(this.toby.speed);

        let speedLength = Math.sqrt(this.toby.speed[0] * this.toby.speed[0] + this.toby.speed[1] * this.toby.speed[1]);
        this.toby.direction[0] = this.toby.speed[0] / speedLength;
        this.toby.direction[1] = this.toby.speed[1] / speedLength;

        this.tmpPosition[0] = this.toby.position[0] + this.toby.speed[0];
        this.tmpPosition[1] = this.toby.position[1] + this.toby.speed[1];

        if (this.level.CanMove(this.tmpPosition)) {
            this.toby.position[0] = this.tmpPosition[0];
            this.toby.position[1] = this.tmpPosition[1];
        }

        this.toby.UpdateGraphics();

        this.level.container.style.left = (-this.toby.position[0] + (window.innerWidth / 2)) + 'px';
        this.level.container.style.top = (-this.toby.position[1] + (window.innerHeight / 2)) + 'px';


        // update circles
        this.moveController.UpdateGraphics();

        // update the highlighted block
        this.level.UpdateHighlightBlock(this.toby);
    }
}


