import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { GraphicsSystem } from "./GraphicsSystem";
import { PhysicsRect } from "../Physics";
import { Table } from "../Blocks/Table";
import { HighlightableRect } from "../Blocks/HighlightableRect";
import { TobHighlighted } from "../Blocks/TobHighlighted";
import { Supply } from "../Blocks/Supply";
import { Knife } from "../Blocks/Knife";
import { Pan } from "../Blocks/Pan";
import { End } from "../Blocks/End";

interface XY {
    id: string;
    x: number;
    y: number;
}


export class HighlightSystem implements IUpdatable {

    app: App;

    static TobySpeed = 200;


    Configure(app: App) {
        this.app = app;
        this.app.AddUpdatable(this);

        app.db.OnInserted(Table, (x) => {
            this.OnInserted(x);
        });
        app.db.OnInserted(Supply, (x) => {
            this.OnInserted(x);
        });
        app.db.OnInserted(Knife, (x) => {
            this.OnInserted(x);
        });
        app.db.OnInserted(Pan, (x) => {
            this.OnInserted(x);
        });
        app.db.OnInserted(End, (x) => {
            this.OnInserted(x);
        });

        app.db.OnInserted(Tob, (tob) => {
            let tobHighlighted = new TobHighlighted();
            tobHighlighted.highlightedId = null;
            app.db.Insert(tobHighlighted);
        });

        app.db.OnUpdated(Tob, (tob) => {

            let tobHighlighted = app.db.First(TobHighlighted);
            tobHighlighted.highlightedId = null;


            let tobPhysicsRect = new PhysicsRect();
            tobPhysicsRect.x = tob.x;
            tobPhysicsRect.y = tob.y;
            tobPhysicsRect.width = GraphicsSystem.SpriteWidth() + 2;
            tobPhysicsRect.height = GraphicsSystem.SpriteHeight() + 2;

            let allHighligtables = this.app.db.GetAll(HighlightableRect);
            let allPhysicsRect = allHighligtables.map(x => x.physicsRect);
            for (let i = 0; i < allPhysicsRect.length; ++i) {
                let physicsRec = allPhysicsRect[i];
                if (this.CheckRect(tobPhysicsRect, physicsRec)) {
                    tobHighlighted.highlightedId = allHighligtables[i].userId;
                    //console.log('CheckRect !');
                }
            }

            this.app.db.Update(tobHighlighted);
        });
    }

    Update(dt: number) {
    }

    CheckRect(rect1: PhysicsRect, rect2: PhysicsRect): boolean {
        let left1 = rect1.x - rect1.width / 2;
        let right1 = rect1.x + rect1.width / 2;
        let top1 = rect1.y + rect1.height / 2;
        let bottom1 = rect1.y - rect1.height / 2;

        let left2 = rect2.x - rect2.width / 2;
        let right2 = rect2.x + rect2.width / 2;
        let top2 = rect2.y + rect2.height / 2;
        let bottom2 = rect2.y - rect2.height / 2;

        if (right1 <= left2 || left1 >= right2 || bottom1 >= top2 || top1 <= bottom2)
            return false;

        return true;
    }

    OnInserted(xy: XY) {
        let highlightableRect = new HighlightableRect();
        let physicsRect = new PhysicsRect();
        physicsRect.x = xy.x;
        physicsRect.y = xy.y;
        physicsRect.width = GraphicsSystem.SpriteWidth();
        physicsRect.height = GraphicsSystem.SpriteHeight();
        highlightableRect.physicsRect = physicsRect;
        highlightableRect.userId = xy.id;

        this.app.db.Insert(highlightableRect);
    }
}