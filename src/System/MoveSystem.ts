import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { TobConstrainedMoveControl } from "../Blocks/TobConstrainedMoveControl";

export class MoveSystem implements IUpdatable {

    app: App;


    Configure(app: App) {
        this.app = app;

        this.app.db.OnInserted(Tob, (tob) => {
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


        this.app.db.OnUpdated(PlayerMoveControl, (moveControl) => {
            let tobMoveControl = this.app.db.First(TobMoveControl);

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

        this.app.db.OnUpdated(TobMoveControl, (tobMoveControl) => {
            let constrained = this.app.db.First(TobConstrainedMoveControl);

            // collide with all the boxes


            constrained.constrainedMoveX = tobMoveControl.moveX;
            constrained.constrainedMoveY = tobMoveControl.moveY;
            this.app.db.Update(constrained);
        });

        this.app.db.OnUpdated(TobConstrainedMoveControl, (tobConstrainedMoveControl) => {
            let tob = this.app.db.First(Tob);
            tob.x += tobConstrainedMoveControl.constrainedMoveX;
            tob.y += tobConstrainedMoveControl.constrainedMoveY;
            this.app.db.Update(tob);
        });
    }



    Update(dt: number) {

    }
}