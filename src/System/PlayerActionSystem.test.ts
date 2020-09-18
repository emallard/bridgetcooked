
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { PlayerAction } from "../Blocks/PlayerAction";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { Root } from "../Blocks/Root";
import { HighlightSystem } from "./HighlightSystem";
import { TobAction } from "../Blocks/TobAction";
import { TobHighlighted } from "../Blocks/TobHighlighted";


describe('FoodSystem', function () {

    it('PlayerActionControl', function () {
        let app = new App().CreateNoDom();
        new PlayerActionSystem().Configure(app);
        app.db.Insert(new Root());

        expect(app.db.Count(PlayerAction)).equal(1);
    });




    it('PlayerAction creates a TobActionCut if highlighted', function () {
        let app = new App().CreateNoDom();
        new PlayerActionSystem().Configure(app);
        new HighlightSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        let tobAction = app.db.First(TobAction);
        let playerAction = app.db.First(PlayerAction);
        let tobHighlighted = app.db.First(TobHighlighted);


        tobHighlighted.highlightedId = null;
        app.db.Update(tobHighlighted);
        app.db.Update(playerAction);
        expect(tobAction.targetId).equals(undefined);

        tobHighlighted.highlightedId = '123';
        app.db.Update(tobHighlighted);
        app.db.Update(playerAction);
        expect(tobAction.targetId).equal('123');

    });

});