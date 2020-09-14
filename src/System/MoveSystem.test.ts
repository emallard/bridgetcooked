
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { MoveSystem } from "./MoveSystem";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { TobConstrainedMove } from "../Blocks/TobConstrainedMove";


describe('MoveSystem', function () {

    it('TobMove to TobPosition', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        expect(app.db.Count(TobMoveControl)).equals(1);
        expect(app.db.Count(TobConstrainedMove)).equals(1);

        let tobMoveControl = app.db.First(TobMoveControl);
        let tobConstrainedMoveControl = app.db.First(TobConstrainedMove);

        expect(toby.x).equals(1);
        expect(toby.y).equals(2);

        tobMoveControl.moveX = 3;
        tobMoveControl.moveY = 4;
        app.db.Update(tobMoveControl);
        app.Update(1);

        expect(tobConstrainedMoveControl.constrainedMoveX).equals(3);
        expect(tobConstrainedMoveControl.constrainedMoveY).equals(4);

        expect(toby.x).equals(4);
        expect(toby.y).equals(6);
    });

    it('PlayerMoveControl to TobMove X', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);


        expect(app.db.Count(TobMoveControl)).equal(1);
        expect(app.db.Count(PlayerMoveControl)).equal(1);

        let tobMoveControl = app.db.First(TobMoveControl);
        let playerMoveControl = app.db.First(PlayerMoveControl);

        playerMoveControl.touchX = playerMoveControl.cx + 200;
        playerMoveControl.touchY = playerMoveControl.cy;
        app.db.Update(playerMoveControl);
        app.Update(1);

        expect(tobMoveControl.moveX).equals(1);
        expect(tobMoveControl.moveY).equals(0);
    });

    it('PlayerMoveControl to TobMove Y', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);


        expect(app.db.Count(TobMoveControl)).equal(1);
        expect(app.db.Count(PlayerMoveControl)).equal(1);

        let tobMoveControl = app.db.First(TobMoveControl);
        let playerMoveControl = app.db.First(PlayerMoveControl);

        playerMoveControl.touchX = playerMoveControl.cx;
        playerMoveControl.touchY = playerMoveControl.cy + 200;
        app.db.Update(playerMoveControl);
        app.Update(1);

        expect(tobMoveControl.moveX).equals(0);
        expect(tobMoveControl.moveY).equals(-1);
    });
});