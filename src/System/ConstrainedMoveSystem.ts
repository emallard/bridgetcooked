import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { TobConstrainedMoveControl } from "../Blocks/TobConstrainedMoveControl";
import { Supply } from "../Blocks/Supply";
import { CollisionRect } from "./CollisionRect";

export class ConstrainedMoveSystem implements IUpdatable {

    app: App;

    static BlockWidth = 101;
    static BlockHeight = 80;

    Configure(app: App) {
        this.app = app;

        this.app.db.OnInserted(Supply, (supply) => {
            let collisionRect = new CollisionRect();
            collisionRect.userId = supply.id;
        });

        this.app.db.OnUpdated(Supply, (supply) => {
            let collisionRect = app.db.First(CollisionRect, x => x.userId == supply.id);
            collisionRect.x = supply.x;
            collisionRect.y = supply.y;
            collisionRect.width = ConstrainedMoveSystem.BlockWidth;
            collisionRect.height = ConstrainedMoveSystem.BlockHeight;
            app.db.Update(collisionRect);
        });

        this.app.db.OnUpdated(TobMoveControl, (tobMoveControl) => {
            let constrained = this.app.db.First(TobConstrainedMoveControl);

            let rects = app.db.GetAll(CollisionRect);

            // collision between rects

            constrained.constrainedMoveX = tobMoveControl.moveX;
            constrained.constrainedMoveY = tobMoveControl.moveY;
            this.app.db.Update(constrained);
        });

    }



    Update(dt: number) {

    }
}