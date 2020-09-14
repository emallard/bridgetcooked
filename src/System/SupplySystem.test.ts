
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { SupplySystem } from "./SupplySystem";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { Supply } from "../Blocks/Supply";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { Root } from "../Blocks/Root";


describe('SupplySystem', function () {
    it('TobActionSupply creates Food', function () {
        let app = new App().CreateNoDom();
        new SupplySystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        expect(app.db.Count(TobActionSupply)).equal(1);

        let supply = new Supply();
        app.db.Insert(supply);

        expect(app.db.Count(Food)).equal(0);

        let tobActionSupply = app.db.First(TobActionSupply);


        tobActionSupply.idSupply = supply.id;
        app.db.Update(tobActionSupply);

        expect(app.db.Count(Food)).equal(1);
        expect(app.db.Count(FoodAttachment)).equal(1);

        let food = app.db.First(Food);
        let foodAttachment = app.db.First(FoodAttachment);
        expect(foodAttachment.idFood).equals(food.id);
        expect(foodAttachment.idAttached).equals(toby.id);
    });



    it('PlayerAction creates a TobActionSupply if close', function () {
        let app = new App().CreateNoDom();
        new PlayerActionSystem().Configure(app);
        new SupplySystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);


        let supply = new Supply();
        supply.x = 100;
        supply.y = 200;
        app.db.Insert(supply);

        expect(app.db.Count(Food)).equal(0);
        expect(app.db.Count(PlayerAction)).equal(1);
        expect(app.db.Count(TobActionSupply)).equal(1);

        let tobActionSupply = app.db.First(TobActionSupply);
        let playerAction = app.db.First(PlayerAction);


        supply.x = 1000;
        supply.y = 2000;
        app.db.Update(supply);
        app.db.Update(playerAction);
        expect(tobActionSupply.idSupply).equals(undefined);

        supply.x = 1;
        supply.y = 2;
        app.db.Update(supply);
        app.db.Update(playerAction);
        expect(tobActionSupply.idSupply).equal(supply.id);

    });

});