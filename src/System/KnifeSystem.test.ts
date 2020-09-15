
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { SupplySystem } from "./SupplySystem";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { TobActionTable } from "../Blocks/TobActionTable";
import { Supply } from "../Blocks/Supply";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { TableSystem } from "./TableSystem";
import { Table } from "../Blocks/Table";
import { Root } from "../Blocks/Root";
import { Knife } from "../Blocks/Knife";
import { FoodType } from "../Blocks/FoodType";
import { TobActionCut } from "../Blocks/TobActionCut";
import { KnifeSystem } from "./KnifeSystem";


describe('KnifeSystem', function () {
    it('TobActionKnife moves FoodAttachment from Toby to Knife and then Cut the food and then back to Toby', function () {
        let app = new App().CreateNoDom();
        new KnifeSystem().Configure(app);
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

        expect(app.db.Count(TobActionCut)).equal(1);
        let tobActionCut = app.db.First(TobActionCut);


        expect(foodAttachment.idAttached).equals(toby.id);

        tobActionCut.idKnife = knife.id;
        app.db.Update(tobActionCut);
        expect(foodAttachment.idAttached).equals(knife.id);

        app.db.Update(tobActionCut);
        expect(food.foodType).equals(FoodType.KiwiCut);

        app.db.Update(tobActionCut);
        expect(foodAttachment.idAttached).equals(toby.id);
    });



    it('PlayerAction creates a TobActionCut if close', function () {
        let app = new App().CreateNoDom();
        new PlayerActionSystem().Configure(app);
        new KnifeSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);


        let knife = new Knife();
        knife.x = 1000;
        knife.y = 2000;
        app.db.Insert(knife);

        expect(app.db.Count(PlayerAction)).equal(1);
        expect(app.db.Count(TobActionCut)).equal(1);

        let tobActionCut = app.db.First(TobActionCut);
        let playerAction = app.db.First(PlayerAction);


        knife.x = 1000;
        knife.y = 2000;
        app.db.Update(knife);
        app.db.Update(playerAction);
        expect(tobActionCut.idKnife).equals(undefined);

        knife.x = 1;
        knife.y = 2;
        app.db.Update(knife);
        app.db.Update(playerAction);
        expect(tobActionCut.idKnife).equal(knife.id);

    });

});