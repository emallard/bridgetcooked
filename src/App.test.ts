
import { expect } from "chai";
import { App } from "./App";
import { Floor } from "./Blocks/Floor";
import { GraphicsSprite } from "./Blocks/GraphicsSprite";
import { Tob } from "./Blocks/Tob";
import { PlayerMoveControl } from "./Blocks/PlayerMoveControl";
import { Supply } from "./Blocks/Supply";
import { ActionController } from "./ActionController";
import { TobActionSupply } from "./Blocks/TobActionSupply";
import { Food } from "./Blocks/Food";
import { FoodAttachment } from "./Blocks/FoodAttachment";


describe('App', function () {


    /*
    it('MoveController Update Toby speed', function () {
        let app = new App();
        app.AddToby(1, 2);
        app.AddMoveController();
        app.Update(1);

        let moveControl = app.db.First(MoveControl);
        moveControl.cx = 200;
        moveControl.cy = 100;
        moveControl.isDown = true;
        moveControl.touchX = 300;
        moveControl.touchY = 100;

        app.Update(1);

        let t = app.db.First(Tob);

        expect(t.x).equals(1);
        expect(t.y).equals(0);
    });


    it('Get Food from Supply', function () {
        let app = new App();
        app.AddSupply(1, 2);
        app.AddToby(10, 20);
        app.AddActionController();
        app.Update(1);

        let f = app.db.First(Supply);
        expect(f.x).equal(1);
        expect(f.y).equal(2);

        let s = app.db.First(GraphicsSprite);
        expect(s.x).equal(1);
        expect(s.y).equal(2);
        expect(s.width).equal(101);
        expect(s.height).equal(130);

        app.Update(1);

        let toby = app.db.First(Tob);
        let action = app.db.First(ActionControl);

        action.isDown = true;
        toby.x = 10;
        toby.y = 20;

        app.Update(1);

        // Pas de Draggable
        expect(app.db.Count(Food)).equals(0);

        toby.x = 1;
        toby.y = 2;
        app.Update(1);

        expect(app.db.Count(Food)).equals(1);
        expect(app.db.Count(FoodAttachment)).equals(1);

        let food = app.db.First(Food);
        let foodAttachment = app.db.First(FoodAttachment);

        expect(foodAttachment.idAttached = toby.id);
        expect(foodAttachment.idFood = food.id);

    });



    it('Put Food On Table', function () {
        let app = new App();
        let toby = app.AddToby(0, 0);
        let supply = app.AddSupply(0, 0);
        app.ActionOnSupply(toby, supply);


        let table = app.AddTable(100, 200);
        toby.x = 100;
        toby.y = 200;
        app.Update(1);

        app.ActionOnTable(toby, table);


        expect(app.db.Count(FoodAttachment)).length(1);
        let foodAttachment = app.db.First(FoodAttachment);
        expect(foodAttachment.idAttached).equals(table.id);
    });

    // Food Graphics Sprite update
    */
});