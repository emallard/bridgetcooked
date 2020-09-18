import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { TobConstrainedMove as TobConstrainedMove } from "../Blocks/TobConstrainedMove";
import { Supply } from "../Blocks/Supply";
import { Wall } from "../Blocks/Wall";
import { DbEntity } from "../Db/DbEntity";
import { GraphicsSystem } from "./GraphicsSystem";
import { PhysicsRect, Physics } from "../Physics";
import { Table } from "../Blocks/Table";
import { Knife } from "../Blocks/Knife";
import { Pan } from "../Blocks/Pan";


export class ConstrainedMoveRect extends DbEntity {
    userId: string;
    physicsRect: PhysicsRect;
}

interface XY {
    id: string;
    x: number;
    y: number;
}

export class MoveSystem implements IUpdatable {

    app: App;

    static TobySpeed = 200;


    Configure(app: App) {
        this.app = app;
        this.app.AddUpdatable(this);

        app.db.OnInserted(Tob, (tob) => {
            let tobConstrainedMove = new TobConstrainedMove();
            tobConstrainedMove.constrainedMoveX = 0;
            tobConstrainedMove.constrainedMoveY = 0;
            app.db.Insert(tobConstrainedMove);

            let tobMove = new TobMoveControl();
            tobMove.dirX = 0;
            tobMove.dirY = 0;
            app.db.Insert(tobMove);

            let moveControl = new PlayerMoveControl();
            moveControl.cx = 100;
            moveControl.cy = 200;
            moveControl.touchX = 100;
            moveControl.touchY = 200;

            app.db.Insert(moveControl);
        });


        app.db.OnInserted(Supply, (x) => {
            this.OnInserted(x);
        });
        app.db.OnInserted(Table, (x) => {
            this.OnInserted(x);
        });
        app.db.OnInserted(Knife, (x) => {
            this.OnInserted(x);
        });
        app.db.OnInserted(Pan, (x) => {
            this.OnInserted(x);
        });

        app.db.OnUpdated(PlayerMoveControl, (playerMoveControl) => {
            let tobMoveControl = app.db.First(TobMoveControl);

            /*
            if (!moveControl.isDown) {
                tobMoveControl.moveX = 0;
                tobMoveControl.moveY = 0;
            }
            */
            //else {
            let dx = playerMoveControl.touchX - playerMoveControl.cx;
            let dy = playerMoveControl.touchY - playerMoveControl.cy;

            if (dx != 0 || dy != 0) {
                let length = Math.sqrt(dx * dx + dy * dy);
                dx /= length;
                dy /= length;
            }

            tobMoveControl.dirX = dx;
            tobMoveControl.dirY = -dy;

            app.db.Update(tobMoveControl);
            //}
        });

    }

    Update(dt: number) {
        let tob = this.app.db.First(Tob);
        let tobMoveControl = this.app.db.First(TobMoveControl);

        if (tobMoveControl.dirX == 0 && tobMoveControl.dirY == 0)
            return;

        let tobConstrainedMoveControl = this.app.db.First(TobConstrainedMove);

        let speedX = tobMoveControl.dirX * MoveSystem.TobySpeed;
        let speedY = tobMoveControl.dirY * MoveSystem.TobySpeed;

        //console.log('targetX : ', targetX, tob.x, tobMoveControl.dirX);
        //console.log('targetY : ', targetY, tob.y, tobMoveControl.dirY);

        let tobPhysicsRect = new PhysicsRect();
        tobPhysicsRect.x = tob.x;
        tobPhysicsRect.y = tob.y;
        tobPhysicsRect.width = GraphicsSystem.SpriteWidth();
        tobPhysicsRect.height = GraphicsSystem.SpriteHeight();

        let physicsRect = this.app.db.GetAll(ConstrainedMoveRect).map(x => x.physicsRect);
        Physics.CollideAll(tobPhysicsRect, physicsRect, speedX, speedY, dt);

        tobConstrainedMoveControl.constrainedMoveX = tobPhysicsRect.x;
        tobConstrainedMoveControl.constrainedMoveY = tobPhysicsRect.y;

        tob.x = tobConstrainedMoveControl.constrainedMoveX;
        tob.y = tobConstrainedMoveControl.constrainedMoveY;

        this.app.db.Update(tob);
    }

    OnInserted(xy: XY) {
        let constrainedMoveRect = new ConstrainedMoveRect();
        let physicsRect = new PhysicsRect();
        physicsRect.x = xy.x;
        physicsRect.y = xy.y;
        physicsRect.width = GraphicsSystem.SpriteWidth();
        physicsRect.height = GraphicsSystem.SpriteHeight();
        constrainedMoveRect.physicsRect = physicsRect;
        constrainedMoveRect.userId = xy.id;

        this.app.db.Insert(constrainedMoveRect);
    }
}