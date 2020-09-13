
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { GraphicsFoodAttachmentSystem } from "./GraphicsFoodAttachmentSystem";
import { FoodSystem } from "./FoodSystem";
import { Toby } from "../Blocks/Toby";
import { Supply } from "../Blocks/Supply";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";


describe('GraphicsFoodAttachmentSystem', function () {
    it('Attached to Toby and update Toby position', function () {

        let app = new App().CreateNoDom();
        new GraphicsSystem().Configure(app);
        new GraphicsFoodAttachmentSystem().Configure(app);
        new FoodSystem().Configure(app);


        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        let food = new Food();
        app.db.Insert(food);

        let foodAttachment = new FoodAttachment();
        foodAttachment.idFood = food.id;
        foodAttachment.idAttached = toby.id;
        app.db.Insert(foodAttachment);

        app.Update(0.1);

        let foodSprite = app.db.First(GraphicsSprite, x => x.userId == food.id);

        expect(foodSprite.x).equals(1);
        expect(foodSprite.y).equals(2);


        toby.x = 5;
        toby.y = 6;
        app.db.Update(toby);

        app.Update(0.1);

        expect(foodSprite.x).equals(5);
        expect(foodSprite.y).equals(6);
    });

});