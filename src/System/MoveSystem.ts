import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { TobConstrainedMoveControl } from "../Blocks/TobConstrainedMoveControl";
import { Supply } from "../Blocks/Supply";
import { Wall } from "../Blocks/Wall";
import { CollisionRect } from "./CollisionRect";

export class MoveSystem implements IUpdatable {

    app: App;


    Configure(app: App) {
        this.app = app;

        app.db.OnInserted(Tob, (tob) => {
            let tobConstrainedMove = new TobConstrainedMoveControl();
            tobConstrainedMove.constrainedMoveX = 0;
            tobConstrainedMove.constrainedMoveY = 0;
            app.db.Insert(tobConstrainedMove);

            let tobMove = new TobMoveControl();
            tobMove.moveX = 0;
            tobMove.moveY = 0;
            app.db.Insert(tobMove);

            let moveControl = new PlayerMoveControl();
            moveControl.cx = 100;
            moveControl.cy = 200;
            moveControl.isDown = false;
            moveControl.touchX = 0;
            moveControl.touchY = 0;

            app.db.Insert(moveControl);
        });


        app.db.OnUpdated(PlayerMoveControl, (moveControl) => {
            let tobMoveControl = app.db.First(TobMoveControl);

            if (!moveControl.isDown) {
                tobMoveControl.moveX = 0;
                tobMoveControl.moveY = 0;
            }
            else {
                let dx = moveControl.touchX - moveControl.cx;
                let dy = moveControl.touchY - moveControl.cy;
                let length = Math.sqrt(dx * dx + dy * dy);
                dx /= length;
                dy /= length;
                tobMoveControl.moveX = dx;
                tobMoveControl.moveY = dy;
            }
        });

        app.db.OnUpdated(TobConstrainedMoveControl, (tobConstrainedMoveControl) => {
            //console.log('TobConstrainedMoveControl updated', tobConstrainedMoveControl.constrainedMoveX);
            let tob = app.db.First(Tob);
            tob.x += tobConstrainedMoveControl.constrainedMoveX;
            tob.y += tobConstrainedMoveControl.constrainedMoveY;
            app.db.Update(tob);
        });

        this.ConfigureConstrainedMove(app);
    }


    ConfigureConstrainedMove(app: App) {

        let blockWidth = 101;
        let blockHeight = 80;
        function InsertCollisionRect(id: string, x: number, y: number) {
            let collisionRect = new CollisionRect();
            collisionRect.userId = id;
            collisionRect.x = x;
            collisionRect.y = y;
            collisionRect.width = blockWidth;
            collisionRect.height = blockHeight;
            app.db.Insert(collisionRect);
        }

        app.db.OnInserted(Supply, (supply) => {
            InsertCollisionRect(supply.id, supply.x, supply.y);
        });

        app.db.OnInserted(Wall, (wall) => {
            InsertCollisionRect(wall.id, wall.x, wall.y);
        });

        app.db.OnUpdated(TobMoveControl, (tobMoveControl) => {
            let constrained = app.db.First(TobConstrainedMoveControl);

            let rects = app.db.GetAll(CollisionRect);

            // collision between rects

            constrained.constrainedMoveX = tobMoveControl.moveX;
            constrained.constrainedMoveY = tobMoveControl.moveY;
            app.db.Update(constrained);
        });

    }


    Update(dt: number) {

    }
}