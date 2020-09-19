import { App } from "../App";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { Floor } from "../Blocks/Floor";
import { IUpdatable } from "../IUpdatable";
import { Tob } from "../Blocks/Tob";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { Food } from "../Blocks/Food";
import { GraphicsSystem } from "./GraphicsSystem";
import { FoodType } from "../Blocks/FoodType";
import { GraphicsSpriteUrl } from "../Blocks/GraphicsSpriteUrl";
import { HighlightableRect } from "../Blocks/HighlightableRect";
import { TobHighlighted } from "../Blocks/TobHighlighted";
import { DbEntity } from "../Db/DbEntity";
import { Table } from "../Blocks/Table";
import { Supply } from "../Blocks/Supply";
import { Knife } from "../Blocks/Knife";
import { Pan } from "../Blocks/Pan";
import { End } from "../Blocks/End";


export class GraphicsHighlightSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        app.db.OnInserted(TobHighlighted, (tobHighlighted) => {

            let graphicsSprite = new GraphicsSprite();
            graphicsSprite.userId = tobHighlighted.id;
            graphicsSprite.x = 0;
            graphicsSprite.y = 0;
            graphicsSprite.z = 4;
            graphicsSprite.width = GraphicsSystem.SpriteWidth();
            graphicsSprite.height = GraphicsSystem.SpriteHeight();
            app.db.Insert(graphicsSprite);

            let spriteUrl = new GraphicsSpriteUrl();
            spriteUrl.idGraphicsSprite = graphicsSprite.id;
            spriteUrl.userId = tobHighlighted.id;
            spriteUrl.url = 'Highlighted.png';
            this.app.db.Insert(spriteUrl);
        });


        app.db.OnUpdated(TobHighlighted, (tobHighlighted: TobHighlighted) => {
            let graphicsSprite = app.db.First(GraphicsSprite, x => x.userId == tobHighlighted.id);

            let table = app.db.First(Table, x => x.id == tobHighlighted.highlightedId);
            let supply = app.db.First(Supply, x => x.id == tobHighlighted.highlightedId);
            let knife = app.db.First(Knife, x => x.id == tobHighlighted.highlightedId);
            let pan = app.db.First(Pan, x => x.id == tobHighlighted.highlightedId);
            let end = app.db.First(End, x => x.id == tobHighlighted.highlightedId);

            if (table != null) {
                graphicsSprite.x = table.x;
                graphicsSprite.y = table.y;
            }
            else if (supply != null) {
                graphicsSprite.x = supply.x;
                graphicsSprite.y = supply.y;
            }
            else if (knife != null) {
                graphicsSprite.x = knife.x;
                graphicsSprite.y = knife.y;
            }
            else if (pan != null) {
                graphicsSprite.x = pan.x;
                graphicsSprite.y = pan.y;
            }
            else if (end != null) {
                graphicsSprite.x = end.x;
                graphicsSprite.y = end.y;
            }
            else {
                graphicsSprite.x = 100000;
                graphicsSprite.y = 100000;
            }

            this.app.db.Update(graphicsSprite);
        });
    }

    Update(dt: number) {

    }
}