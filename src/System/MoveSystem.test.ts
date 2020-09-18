
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { TobMoveControl } from "../Blocks/TobMoveControl";
import { MoveSystem, ConstrainedMoveRect } from "./MoveSystem";
import { PlayerMoveControl } from "../Blocks/PlayerMoveControl";
import { TobConstrainedMove } from "../Blocks/TobConstrainedMove";
import { Root } from "../Blocks/Root";
import { Supply } from "../Blocks/Supply";


describe('MoveSystem', function () {

    it('TobMove to TobPosition', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

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

        tobMoveControl.dirX = 3;
        tobMoveControl.dirY = 4;
        app.db.Update(tobMoveControl);
        app.Update(0.1);

        expect(tobConstrainedMoveControl.constrainedMoveX).approximately(1 + tobMoveControl.dirX * MoveSystem.TobySpeed * 0.1, 0.1);
        expect(tobConstrainedMoveControl.constrainedMoveY).approximately(2 + tobMoveControl.dirY * MoveSystem.TobySpeed * 0.1, 0.1);
    });


    it('PlayerMoveControl to TobMove X', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

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

        expect(tobMoveControl.dirX).equals(1);
        expect(tobMoveControl.dirY).equals(0);
    });

    it('PlayerMoveControl to TobMove Y', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

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

        expect(tobMoveControl.dirX).equals(0);
        expect(tobMoveControl.dirY).equals(-1);
    });


    //
    //  ConstrainedMoveRect
    //

    it('Supply creates a ConstrainedMoveRect', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

        let supply = new Supply();
        supply.x = 1;
        supply.y = 2;
        app.db.Insert(supply);

        expect(app.db.Count(ConstrainedMoveRect)).equals(1);

        let constrainedMoveRect = app.db.First(ConstrainedMoveRect);

        expect(constrainedMoveRect.userId).equals(supply.id);
        expect(constrainedMoveRect.physicsRect.x).equals(1);
        expect(constrainedMoveRect.physicsRect.y).equals(2);
        expect(constrainedMoveRect.physicsRect.width).equals(GraphicsSystem.SpriteWidth());
        expect(constrainedMoveRect.physicsRect.height).equals(GraphicsSystem.SpriteHeight());
    });

});