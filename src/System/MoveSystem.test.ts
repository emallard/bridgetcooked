
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob, TobMoveControl } from "../Blocks/Tob";
import { MoveSystem } from "./MoveSystem";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";


describe('MoveSystem', function () {
    it('MoveControl to TobMove', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);


        expect(app.db.Count(TobMoveControl)).equal(1);
        expect(app.db.Count(PlayerMoveControl)).equal(1);

        let tobMoveControl = app.db.First(TobMoveControl);
        let moveControl = app.db.First(PlayerMoveControl);

        moveControl.isDown = true;
        moveControl.touchX = moveControl.cx + 200;
        moveControl.touchY = moveControl.cy;
        app.db.Update(moveControl);

        expect(tobMoveControl.moveX).equals(1);
        expect(tobMoveControl.moveY).equals(0);
    });



    it('TobMove to TobPosition', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        let tobMoveControl = app.db.First(TobMoveControl);
        tobMoveControl.moveX = 3;
        tobMoveControl.moveY = 4;
        app.db.Update(tobMoveControl);

        expect(toby.x).equals(4);
        expect(toby.y).equals(6);
    });
});