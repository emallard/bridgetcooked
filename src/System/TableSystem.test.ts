
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
import { TableSystem } from "./TableSystem";
import { Table } from "../Blocks/Table";
import { Root } from "../Blocks/Root";
import { TobHighlighted } from "../Blocks/TobHighlighted";
import { HighlightSystem } from "./HighlightSystem";


describe('TableSystem', function () {
    it('TobActionTable moves FoodAttachment', function () {
        let app = new App().CreateNoDom();
        new TableSystem().Configure(app);
        new PlayerActionSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        app.db.Insert(toby);

        let table = new Table();
        app.db.Insert(table);

        let food = new Food();
        app.db.Insert(food);
        let foodAttachment = new FoodAttachment();
        foodAttachment.idFood = food.id;
        foodAttachment.idAttached = toby.id;
        app.db.Insert(foodAttachment);

        expect(app.db.Count(TobAction)).equal(1);
        let tobActionTable = app.db.First(TobAction);


        expect(foodAttachment.idAttached).equals(toby.id);

        tobActionTable.targetId = table.id;
        app.db.Update(tobActionTable);
        expect(foodAttachment.idAttached).equals(table.id);


        tobActionTable.targetId = table.id;
        app.db.Update(tobActionTable);
        expect(foodAttachment.idAttached).equals(toby.id);
    });

});