
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { Root } from "../Blocks/Root";
import { Knife } from "../Blocks/Knife";
import { FoodType } from "../Blocks/FoodType";
import { TobAction } from "../Blocks/TobAction";
import { PanSystem } from "./PanSystem";
import { Pan } from "../Blocks/Pan";


describe('PanSystem', function () {
    it('Pan Cook Kiwi and Pork', function () {
        let app = new App().CreateNoDom();
        new PanSystem().Configure(app);
        new PlayerActionSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        app.db.Insert(toby);

        let pan = new Pan();
        app.db.Insert(pan);

        let food = new Food();
        food.foodType = FoodType.KiwiCut;
        app.db.Insert(food);
        let foodAttachment = new FoodAttachment();
        foodAttachment.idFood = food.id;
        foodAttachment.idAttached = toby.id;
        app.db.Insert(foodAttachment);

        let tobAction = app.db.First(TobAction);
        tobAction.targetId = pan.id;
        app.db.Update(tobAction);
        expect(foodAttachment.idAttached).equals(pan.id);



        let foodPork = new Food();
        foodPork.foodType = FoodType.PorkCut;
        app.db.Insert(foodPork);
        let foodPorkAttachment = new FoodAttachment();
        foodPorkAttachment.idFood = foodPork.id;
        foodPorkAttachment.idAttached = toby.id;
        app.db.Insert(foodPorkAttachment);


        app.db.Update(tobAction);
        expect(food.foodType).equals(FoodType.PorkKiwiCooked);
        expect(foodPorkAttachment.idAttached).equals(null);

        app.db.Update(tobAction);
        expect(foodAttachment.idAttached).equals(toby.id);
    });


    it('Pan Cook Rice', function () {

        let app = new App().CreateNoDom();
        new PanSystem().Configure(app);
        new PlayerActionSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        app.db.Insert(toby);

        let pan = new Pan();
        app.db.Insert(pan);

        let food = new Food();
        food.foodType = FoodType.Rice;
        app.db.Insert(food);
        let foodAttachment = new FoodAttachment();
        foodAttachment.idFood = food.id;
        foodAttachment.idAttached = toby.id;
        app.db.Insert(foodAttachment);

        let tobAction = app.db.First(TobAction);
        tobAction.targetId = pan.id;
        app.db.Update(tobAction);
        expect(foodAttachment.idAttached).equals(pan.id);
        expect(food.foodType).equals(FoodType.RiceCooked);


        app.db.Update(tobAction);
        expect(foodAttachment.idAttached).equals(toby.id);
    });
});