import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { Tob, TobMoveControl } from "../Blocks/Tob";

export class MoveSystem implements IUpdatable {

    app: App;


    Configure(app: App) {
        this.app = app;

        this.app.db.OnInserted(Tob, (tob) => {
            let tobMove = new TobMoveControl();
            app.db.Insert(tobMove);
        });

        this.app.db.OnInserted(TobMoveControl, (tob) => {
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
            let tob = this.app.db.First(Tob);
            tob.x += tobMoveControl.moveX;
            tob.y += tobMoveControl.moveY;
            this.app.db.Update(tob);
        });
    }



    Update(dt: number) {

    }
}