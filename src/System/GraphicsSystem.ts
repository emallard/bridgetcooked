import { App } from "../App";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { Floor } from "../Blocks/Floor";
import { IUpdatable } from "../IUpdatable";
import { Tob } from "../Blocks/Tob";
import { Supply as Food } from "../Blocks/Supply";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { Table } from "../Blocks/Table";

export class GraphicsSystem implements IUpdatable {
    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        app.db.OnInserted(Floor, (floor: Floor) => {
            let graphicsSprite = new GraphicsSprite();
            graphicsSprite.userId = floor.id;
            graphicsSprite.x = floor.x;
            graphicsSprite.y = floor.y;
            graphicsSprite.z = 0;
            graphicsSprite.url = floor.url;
            graphicsSprite.width = GraphicsSystem.SpriteWidth();
            graphicsSprite.height = GraphicsSystem.SpriteHeight();
            app.db.Insert(graphicsSprite);
        });

        app.db.OnInserted(Food, (supply: Food) => {
            let graphicsSprite = new GraphicsSprite();
            graphicsSprite.userId = supply.id;
            graphicsSprite.x = supply.x;
            graphicsSprite.y = supply.y;
            graphicsSprite.z = 0;
            graphicsSprite.url = 'SupplyBlock.png';
            graphicsSprite.width = GraphicsSystem.SpriteWidth();
            graphicsSprite.height = GraphicsSystem.SpriteHeight();
            app.db.Insert(graphicsSprite);
        });

        app.db.OnInserted(Table, (table: Table) => {
            let graphicsSprite = new GraphicsSprite();
            graphicsSprite.userId = table.id;
            graphicsSprite.x = table.x;
            graphicsSprite.y = table.y;
            graphicsSprite.z = 0;
            graphicsSprite.url = 'WoodBlock.png';
            graphicsSprite.width = GraphicsSystem.SpriteWidth();
            graphicsSprite.height = GraphicsSystem.SpriteHeight();
            app.db.Insert(graphicsSprite);
        });

        app.db.OnInserted(Tob, (toby: Tob) => {
            let graphicsSprite = new GraphicsSprite();
            graphicsSprite.userId = toby.id;
            graphicsSprite.x = toby.x;
            graphicsSprite.y = toby.y;
            graphicsSprite.z = 1;
            graphicsSprite.url = 'CharacterCatGirlDown.png';
            graphicsSprite.width = GraphicsSystem.SpriteWidth();
            graphicsSprite.height = GraphicsSystem.SpriteHeight();
            //graphicsSprite.isForeground = true;
            app.db.Insert(graphicsSprite);
        });

        app.db.OnUpdated(Tob, (toby: Tob) => {
            let graphicsSprite = this.app.db.First(GraphicsSprite, x => x.userId == toby.id);
            graphicsSprite.x = toby.x;
            graphicsSprite.y = toby.y;
            app.db.Update(graphicsSprite);
        });
    }

    Update(dt: number) {
    }

    static SpriteWidth(): number {
        return 101;
    }

    static SpriteHeight(): number {
        return 80;
    }
}