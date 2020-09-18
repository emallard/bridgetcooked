import { App } from "../App";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { Floor } from "../Blocks/Floor";
import { IUpdatable } from "../IUpdatable";
import { Tob } from "../Blocks/Tob";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { Table } from "../Blocks/Table";
import { Supply } from "../Blocks/Supply";
import { FoodType } from "../Blocks/FoodType";
import { Knife } from "../Blocks/Knife";
import { GraphicsSpriteUrl } from "../Blocks/GraphicsSpriteUrl";

interface XY {
    id: string;
    x: number;
    y: number;
}

export class GraphicsSystem implements IUpdatable {
    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        app.db.OnInserted(Floor, (floor: Floor) => {
            this.OnInserted(floor, floor.url, 0);
        });

        app.db.OnInserted(Supply, (supply: Supply) => {
            this.OnInserted(supply, 'SupplyBlock.png', 0);
            if (supply.foodType == FoodType.Kiwi)
                this.OnInserted(supply, 'Kiwi.png', 0.1);
            else if (supply.foodType == FoodType.Pork)
                this.OnInserted(supply, 'Pork.png', 0.1);
            else
                this.OnInserted(supply, 'Food.png', 0.1);

        });

        app.db.OnInserted(Table, (table: Table) => {
            this.OnInserted(table, 'WoodBlock.png', 0);
        });

        app.db.OnInserted(Knife, (knife: Knife) => {
            console.log('graphics cutting board !')
            this.OnInserted(knife, 'CuttingBlock.png', 0);
        });

        app.db.OnInserted(Tob, (toby: Tob) => {
            this.OnInserted(toby, 'CharacterCatGirlDown.png', 1);
        });

        app.db.OnUpdated(Tob, (toby: Tob) => {
            let graphicsSprite = this.app.db.First(GraphicsSprite, x => x.userId == toby.id);
            graphicsSprite.x = toby.x;
            graphicsSprite.y = toby.y;
            app.db.Update(graphicsSprite);
        });
    }

    OnInserted(xy: XY, url: string, z: number) {
        let graphicsSprite = new GraphicsSprite();
        graphicsSprite.userId = xy.id;
        graphicsSprite.x = xy.x;
        graphicsSprite.y = xy.y;
        graphicsSprite.z = z;
        graphicsSprite.width = GraphicsSystem.SpriteWidth();
        graphicsSprite.height = GraphicsSystem.SpriteHeight();
        this.app.db.Insert(graphicsSprite);

        let spriteUrl = new GraphicsSpriteUrl();
        spriteUrl.idGraphicsSprite = graphicsSprite.id;
        spriteUrl.userId = xy.id;
        spriteUrl.url = url;
        this.app.db.Insert(spriteUrl);
    }

    Update(dt: number) {
    }

    static SpriteWidth(): number {
        return 100;
    }

    static SpriteHeight(): number {
        return 80;
    }
}