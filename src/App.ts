import { Db } from "./Db/Db";
import { Tob } from "./Blocks/Tob";
import { Table } from "./Blocks/Table";
import { Supply } from "./Blocks/Supply";
import { IUpdatable } from "./IUpdatable";
import { GraphicsSystem } from "./System/GraphicsSystem";
import { MoveSystem } from "./System/MoveSystem";
import { HighlightSystem } from "./System/HighlightSystem";
import { PlayerActionSystem } from "./System/PlayerActionSystem";
import { SupplySystem } from "./System/SupplySystem";
import { TableSystem } from "./System/TableSystem";
import { KnifeSystem } from "./System/KnifeSystem";
import { PanSystem } from "./System/PanSystem";
import { EndSystem } from "./System/EndSystem";
import { GraphicsHighlightSystem } from "./System/GraphicsHighlightSystem";
import { GraphicsFoodAttachmentSystem } from "./System/GraphicsFoodAttachmentSystem";
import { SvgRootSystem } from "./System/SvgRootSystem";
import { SvgPlayerMoveControlSystem } from "./System/SvgPlayerMoveControlSystem";
import { SvgPlayerActionControlSystem } from "./System/SvgPlayerActionControlSystem";
import { ThreeSystem } from "./System/ThreeSystem";
import { ThreeGraphicsSpriteSystem } from "./System/ThreeGraphicsSpriteSystem";
import { DomMessageSystem } from "./System/DomMessageSystem";
import { TimerSystem } from "./System/TimerSystem";

export class App {

    updatables: IUpdatable[] = [];
    db: Db;
    timerSystem: TimerSystem;

    CreateNoDom(): App {
        this.db = new Db();
        return this;
    }

    CreateDom(): App {
        this.CreateNoDom();

        new GraphicsSystem().Configure(this);
        new MoveSystem().Configure(this);
        new HighlightSystem().Configure(this);
        new PlayerActionSystem().Configure(this);
        new SupplySystem().Configure(this);
        new TableSystem().Configure(this);
        new KnifeSystem().Configure(this);
        new PanSystem().Configure(this);
        new EndSystem().Configure(this);
        new GraphicsHighlightSystem().Configure(this);
        new GraphicsFoodAttachmentSystem().Configure(this);
        new SvgRootSystem().Configure(this);
        new SvgPlayerMoveControlSystem().Configure(this);
        new SvgPlayerActionControlSystem().Configure(this);
        new ThreeSystem().Configure(this);
        new ThreeGraphicsSpriteSystem().Configure(this);
        this.timerSystem = new TimerSystem().Configure(this);
        new DomMessageSystem().Configure(this);


        return this;
    }

    AddUpdatable(updatable: IUpdatable) {
        this.updatables.push(updatable);
    }


    Update(dt: number) {
        this.updatables.forEach(x => {
            x.Update(dt);
        });
    }

    Start() {
        this.timerSystem.Start();
    }
}


