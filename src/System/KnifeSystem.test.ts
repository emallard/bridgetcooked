
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { Root } from "../Blocks/Root";
import { Knife } from "../Blocks/Knife";
import { FoodType } from "../Blocks/FoodType";
import { KnifeSystem } from "./KnifeSystem";
import { TobHighlighted } from "../Blocks/TobHighlighted";
import { HighlightSystem } from "./HighlightSystem";
import { TobAction } from "../Blocks/TobAction";


describe('KnifeSystem', function () {
    it('TobAction moves FoodAttachment from Toby to Knife and then Cut the food and then back to Toby', function () {
        let app = new App().CreateNoDom();
        new KnifeSystem().Configure(app);
        new PlayerActionSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        app.db.Insert(toby);

        let knife = new Knife();
        app.db.Insert(knife);

        let food = new Food();
        food.foodType = FoodType.Kiwi;
        app.db.Insert(food);
        let foodAttachment = new FoodAttachment();
        foodAttachment.idFood = food.id;
        foodAttachment.idAttached = toby.id;
        app.db.Insert(foodAttachment);

        let tobAction = app.db.First(TobAction);


        expect(foodAttachment.idAttached).equals(toby.id);

        tobAction.targetId = knife.id;
        app.db.Update(tobAction);
        expect(foodAttachment.idAttached).equals(knife.id);

        app.db.Update(tobAction);
        expect(food.foodType).equals(FoodType.KiwiCut);

        app.db.Update(tobAction);
        expect(foodAttachment.idAttached).equals(toby.id);
    });
});