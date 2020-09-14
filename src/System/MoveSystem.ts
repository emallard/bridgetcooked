import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { TobConstrainedMove as TobConstrainedMove } from "../Blocks/TobConstrainedMove";
import { Supply } from "../Blocks/Supply";
import { Wall } from "../Blocks/Wall";
import { CollisionRect } from "../Blocks/CollisionRect";

export class MoveSystem implements IUpdatable {

    app: App;


    Configure(app: App) {
        this.app = app;
        this.app.AddUpdatable(this);

        app.db.OnInserted(Tob, (tob) => {
            let tobConstrainedMove = new TobConstrainedMove();
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
            moveControl.touchX = 100;
            moveControl.touchY = 200;

            app.db.Insert(moveControl);
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

            tobMoveControl.moveX = dx;
            tobMoveControl.moveY = -dy;

            app.db.Update(tobMoveControl);
            //}
        });


        //this.ConfigureConstrainedMove(app);
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

    }


    Update(dt: number) {
        let tob = this.app.db.First(Tob);
        let tobMoveControl = this.app.db.First(TobMoveControl);

        let tobConstrainedMoveControl = this.app.db.First(TobConstrainedMove);
        tobConstrainedMoveControl.constrainedMoveX = tobMoveControl.moveX;
        tobConstrainedMoveControl.constrainedMoveY = tobMoveControl.moveY;

        tob.x += tobConstrainedMoveControl.constrainedMoveX;
        tob.y += tobConstrainedMoveControl.constrainedMoveY;

        this.app.db.Update(tob);
    }
}