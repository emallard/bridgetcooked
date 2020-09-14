
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { SupplySystem } from "./SupplySystem";
import { TobActionSupply, TobActionTable } from "../Blocks/TobActionSupply";
import { Supply } from "../Blocks/Supply";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { TableSystem } from "./TableSystem";
import { Table } from "../Blocks/Table";
import { Root } from "../Blocks/Root";


describe('TableSystem', function () {
    it('TobActionTable moves FoodAttachment', function () {
        let app = new App().CreateNoDom();
        new TableSystem().Configure(app);
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

        expect(app.db.Count(TobActionTable)).equal(1);
        let tobActionTable = app.db.First(TobActionTable);


        expect(foodAttachment.idAttached).equals(toby.id);

        tobActionTable.idTable = table.id;
        console.log('start test');
        app.db.Update(tobActionTable);
        expect(foodAttachment.idAttached).equals(table.id);


        tobActionTable.idTable = table.id;
        app.db.Update(tobActionTable);
        expect(foodAttachment.idAttached).equals(toby.id);
    });



    it('PlayerAction creates a TobActionTable if close', function () {
        let app = new App().CreateNoDom();
        new PlayerActionSystem().Configure(app);
        new TableSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);


        let table = new Table();
        table.x = 100;
        table.y = 200;
        app.db.Insert(table);

        expect(app.db.Count(PlayerAction)).equal(1);
        expect(app.db.Count(TobActionTable)).equal(1);

        let tobActionTable = app.db.First(TobActionTable);
        let playerAction = app.db.First(PlayerAction);


        table.x = 1000;
        table.y = 2000;
        app.db.Update(table);
        app.db.Update(playerAction);
        expect(tobActionTable.idTable).equals(undefined);

        table.x = 1;
        table.y = 2;
        app.db.Update(table);
        app.db.Update(playerAction);
        expect(tobActionTable.idTable).equal(table.id);

    });

});