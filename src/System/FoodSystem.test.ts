
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob, TobMoveControl } from "../Blocks/Tob";
import { MoveSystem } from "./MoveSystem";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { FoodSystem } from "./FoodSystem";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { Supply } from "../Blocks/Supply";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";


describe('FoodSystem', function () {
    it('TobActionSupply creates Food', function () {
        let app = new App().CreateNoDom();
        new FoodSystem().Configure(app);

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


    /*
    it('PlayerActionControl creates a TobActionSupply if close', function () {

    });
    */
});