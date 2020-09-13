
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { MoveSystem } from "./MoveSystem";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { TobConstrainedMoveControl } from "../Blocks/TobConstrainedMoveControl";


describe('MoveSystem', function () {

    it('TobMove to TobPosition', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        expect(app.db.Count(TobMoveControl)).equals(1);
        expect(app.db.Count(TobConstrainedMoveControl)).equals(1);

        let tobMoveControl = app.db.First(TobMoveControl);
        let tobConstrainedMoveControl = app.db.First(TobConstrainedMoveControl);

        expect(toby.x).equals(1);
        expect(toby.y).equals(2);

        tobMoveControl.moveX = 3;
        tobMoveControl.moveY = 4;
        app.db.Update(tobMoveControl);

        expect(tobConstrainedMoveControl.constrainedMoveX).equals(3);
        expect(tobConstrainedMoveControl.constrainedMoveY).equals(4);

        expect(toby.x).equals(4);
        expect(toby.y).equals(6);
    });

    it('PlayerMoveControl to TobMove', function () {
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
});