
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";


describe('GraphicsSystem', function () {
    it('Add Floor', function () {
        let app = new App().CreateNoDom();
        new GraphicsSystem().Configure(app);

        let floor = new Floor();
        floor.x = 1;
        floor.y = 2;
        app.db.Insert(floor);

        let s = app.db.First(GraphicsSprite);
        expect(s.x).equal(1);
        expect(s.y).equal(2);
        expect(s.width).equal(GraphicsSystem.SpriteWidth());
        expect(s.height).equal(GraphicsSystem.SpriteHeight());
    });

    it('Add Toby', function () {
        let app = new App().CreateNoDom();
        new GraphicsSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        let s = app.db.First(GraphicsSprite);
        expect(s.x).equal(1);
        expect(s.y).equal(2);
        expect(s.width).equal(GraphicsSystem.SpriteWidth());
        expect(s.height).equal(GraphicsSystem.SpriteHeight());
    });
});