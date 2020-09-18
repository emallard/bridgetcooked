
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


describe('MoveSystem2', function () {

    it('Constrained TobMove, Rect on the right', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = -3; // 1 pixels on the right
        toby.y = 0;
        app.db.Insert(toby);

        let supply = new Supply();
        supply.x = GraphicsSystem.SpriteWidth();
        supply.y = 0;
        app.db.Insert(supply);

        let tobMoveControl = app.db.First(TobMoveControl);

        tobMoveControl.dirX = 1;
        tobMoveControl.dirY = 0;
        app.db.Update(tobMoveControl);

        // update 0.2 => move : 200 * 0.02 = 4
        app.Update(0.02);

        let tobConstrainedMove = app.db.First(TobConstrainedMove);
        expect(tobConstrainedMove.constrainedMoveX).approximately(0, 1);
    });


    it('Constrained TobMove, Rect on the left', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 3; // 1 pixels on the right
        toby.y = 0;
        app.db.Insert(toby);

        let supply = new Supply();
        supply.x = -GraphicsSystem.SpriteWidth();
        supply.y = 0;
        app.db.Insert(supply);

        let tobMoveControl = app.db.First(TobMoveControl);

        tobMoveControl.dirX = -1;
        tobMoveControl.dirY = 0;
        app.db.Update(tobMoveControl);

        // update 0.2 => move : 0.1 * 200 * 0.2 = 4
        app.Update(0.02);

        let tobConstrainedMove = app.db.First(TobConstrainedMove);
        expect(tobConstrainedMove.constrainedMoveX).approximately(0, 1);
    });


    it('Constrained TobMove, Rect on top', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 0;
        toby.y = -1;
        app.db.Insert(toby);

        let supply = new Supply();
        supply.x = 0;
        supply.y = GraphicsSystem.SpriteHeight();
        app.db.Insert(supply);

        let tobMoveControl = app.db.First(TobMoveControl);

        tobMoveControl.dirX = 0;
        tobMoveControl.dirY = 1;
        app.db.Update(tobMoveControl);

        // update 0.2 => move : 0.1 * 200 * 0.2 = 4
        app.Update(0.02);

        let tobConstrainedMove = app.db.First(TobConstrainedMove);
        expect(tobConstrainedMove.constrainedMoveY).approximately(0, 1);
    });


    it('Constrained TobMove, Rect on bottom', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 0;
        toby.y = 1;
        app.db.Insert(toby);

        let supply = new Supply();
        supply.x = 0;
        supply.y = -GraphicsSystem.SpriteHeight();
        app.db.Insert(supply);

        let tobMoveControl = app.db.First(TobMoveControl);

        tobMoveControl.dirX = 0;
        tobMoveControl.dirY = -1;
        app.db.Update(tobMoveControl);

        // update 0.2 => move : 0.1 * 200 * 0.2 = 4
        app.Update(0.02);

        let tobConstrainedMove = app.db.First(TobConstrainedMove);
        expect(tobConstrainedMove.constrainedMoveY).approximately(0, 1);
    });

    //
    //
    //
    //

    /*
    it('Constrained TobMove, Rect on the right with top', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = -1; // 1 pixels on the right
        toby.y = -2;
        app.db.Insert(toby);

        let supply = new Supply();
        supply.x = GraphicsSystem.SpriteWidth();
        supply.y = GraphicsSystem.SpriteHeight();
        app.db.Insert(supply);

        let tobMoveControl = app.db.First(TobMoveControl);

        tobMoveControl.dirX = 1;
        tobMoveControl.dirY = 1;
        app.db.Update(tobMoveControl);

        // update 0.2 => 200 * 0.02 = 4
        app.Update(0.02);

        let tobConstrainedMove = app.db.First(TobConstrainedMove);
        expect(tobConstrainedMove.constrainedMoveX).equal(0);
        expect(tobConstrainedMove.constrainedMoveY).approximately(0, 1);
    });


    it('Constrained TobMove, Rect on the top with right', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = -2; // 1 pixels on the right
        toby.y = -1;
        app.db.Insert(toby);

        let supply = new Supply();
        supply.x = GraphicsSystem.SpriteWidth();
        supply.y = GraphicsSystem.SpriteHeight();
        app.db.Insert(supply);

        let tobMoveControl = app.db.First(TobMoveControl);

        tobMoveControl.dirX = 1;
        tobMoveControl.dirY = 1;
        app.db.Update(tobMoveControl);

        // update 0.2 => move : 200 * 0.02 = 4
        app.Update(0.02);

        let tobConstrainedMove = app.db.First(TobConstrainedMove);
        expect(tobConstrainedMove.constrainedMoveX).not.equal(0);
        expect(tobConstrainedMove.constrainedMoveY).approximately(0, 1);
    });
    */
});