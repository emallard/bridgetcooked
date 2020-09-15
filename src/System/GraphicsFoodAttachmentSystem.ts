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


export class GraphicsFoodAttachmentSystem implements IUpdatable {
    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        app.db.OnInserted(Food, (food: Food) => {

            let graphicsSprite = new GraphicsSprite();
            graphicsSprite.userId = food.id;
            graphicsSprite.z = 3;
            graphicsSprite.width = GraphicsSystem.SpriteWidth();
            graphicsSprite.height = GraphicsSystem.SpriteHeight();
            app.db.Insert(graphicsSprite);

            let spriteUrl = new GraphicsSpriteUrl();
            spriteUrl.idGraphicsSprite = graphicsSprite.id;
            spriteUrl.userId = food.id;
            spriteUrl.url = undefined;
            this.app.db.Insert(spriteUrl);
        });

        app.db.OnUpdated(Food, (food: Food) => {
            console.log('update foodType = ' + food.foodType);

            let graphicsSpriteUrl = app.db.First(GraphicsSpriteUrl, x => x.userId == food.id);
            if (food.foodType == FoodType.Kiwi)
                graphicsSpriteUrl.url = 'Kiwi.png';
            else if (food.foodType == FoodType.KiwiCut)
                graphicsSpriteUrl.url = 'KiwiCut.png';
            else if (food.foodType == FoodType.Pork)
                graphicsSpriteUrl.url = 'Pork.png';
            else
                graphicsSpriteUrl.url = 'Food.png';

            app.db.Update(graphicsSpriteUrl);
        });

    }

    Update(dt: number) {

        for (let attachment of this.app.db.GetAll(FoodAttachment)) {

            let idFood = attachment.idFood;
            let foodSprite = this.app.db.First(GraphicsSprite, x => x.userId == idFood);
            let attachedSprite = this.app.db.First(GraphicsSprite, x => x.userId == attachment.idAttached);

            foodSprite.x = attachedSprite.x;
            foodSprite.y = attachedSprite.y;

            this.app.db.Update(foodSprite);
        }
    }

}