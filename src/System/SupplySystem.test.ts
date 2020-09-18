
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { SupplySystem } from "./SupplySystem";
import { TobAction } from "../Blocks/TobAction";
import { Supply } from "../Blocks/Supply";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { Root } from "../Blocks/Root";
import { FoodType } from "../Blocks/FoodType";


describe('SupplySystem', function () {
    it('TobActionSupply creates Food', function () {
        let app = new App().CreateNoDom();
        new PlayerActionSystem().Configure(app);
        new SupplySystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        expect(app.db.Count(TobAction)).equal(1);

        let supply = new Supply();
        supply.foodType = FoodType.Kiwi;
        app.db.Insert(supply);

        expect(app.db.Count(Food)).equal(0);

        let tobAction = app.db.First(TobAction);


        tobAction.targetId = supply.id;
        app.db.Update(tobAction);

        expect(app.db.Count(Food)).equal(1);
        expect(app.db.Count(FoodAttachment)).equal(1);

        let food = app.db.First(Food);
        let foodAttachment = app.db.First(FoodAttachment);

        expect(food.foodType).equals(FoodType.Kiwi);
        expect(foodAttachment.idFood).equals(food.id);
        expect(foodAttachment.idAttached).equals(toby.id);
    });



});