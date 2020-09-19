
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { TobAction } from "../Blocks/TobAction";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { TableSystem } from "./TableSystem";
import { Table } from "../Blocks/Table";
import { Root } from "../Blocks/Root";
import { FoodType } from "../Blocks/FoodType";
import { EndSystem } from "./EndSystem";
import { End } from "../Blocks/End";
import { MessageEnd } from "../Blocks/MessageEnd";


describe('EndSystem', function () {
    it('End !', function () {
        let app = new App().CreateNoDom();
        new EndSystem().Configure(app);
        new PlayerActionSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        app.db.Insert(toby);

        let end = new End();
        app.db.Insert(end);

        let food = new Food();
        app.db.Insert(food);
        food.foodType = FoodType.PlateEnd;
        let foodAttachment = new FoodAttachment();
        foodAttachment.idFood = food.id;
        foodAttachment.idAttached = toby.id;
        app.db.Insert(foodAttachment);

        let tobAction = app.db.First(TobAction);

        tobAction.targetId = end.id;
        app.db.Update(tobAction);
        expect(foodAttachment.idAttached).equals(null);


        expect(app.db.Count(MessageEnd)).equals(1);
    });

});