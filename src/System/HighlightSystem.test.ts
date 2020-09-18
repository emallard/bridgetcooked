
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
import { HighlightSystem } from "./HighlightSystem";
import { HighlightableRect } from "../Blocks/HighlightableRect";
import { Table } from "../Blocks/Table";
import { TobHighlighted } from "../Blocks/TobHighlighted";


describe('HighlightSystem', function () {

    it('Highlight', function () {
        let app = new App().CreateNoDom();
        new MoveSystem().Configure(app);
        new HighlightSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1000;
        toby.y = 1000;
        app.db.Insert(toby);

        let table = new Table();
        table.x = GraphicsSystem.SpriteWidth();
        table.y = 0;
        app.db.Insert(table);

        expect(app.db.Count(HighlightableRect)).equal(1);
        let highlightableRect = app.db.First(HighlightableRect);
        expect(highlightableRect.userId).equals(table.id);
        expect(highlightableRect.physicsRect.x).equals(table.x);
        expect(highlightableRect.physicsRect.y).equals(table.y);
        expect(highlightableRect.physicsRect.width).equals(GraphicsSystem.SpriteWidth());
        expect(highlightableRect.physicsRect.height).equals(GraphicsSystem.SpriteHeight());


        expect(app.db.Count(TobHighlighted)).equal(1);
        let tobHighlighted = app.db.First(TobHighlighted);
        expect(tobHighlighted.highlightedId).equals(null);

        toby.x = 0;
        toby.y = 0;
        app.db.Update(toby);

        expect(tobHighlighted.highlightedId).equals(table.id);
    });

});