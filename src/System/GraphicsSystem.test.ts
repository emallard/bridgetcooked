
import { App } from "../App";
import { GraphicsSystem } from "./GraphicsSystem";
import { Floor } from "../Blocks/Floor";
import { GraphicsSprite } from "../Blocks/GraphicsSprite";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { Root } from "../Blocks/Root";
import { Knife } from "../Blocks/Knife";
import { GraphicsSpriteUrl } from "../Blocks/GraphicsSpriteUrl";


describe('GraphicsSystem', function () {
    it('Add Floor', function () {
        let app = new App().CreateNoDom();
        new GraphicsSystem().Configure(app);
        app.db.Insert(new Root());

        let floor = new Floor();
        floor.x = 1;
        floor.y = 2;
        floor.url = 'StoneBlock.png';
        app.db.Insert(floor);

        let s = app.db.First(GraphicsSprite);
        expect(s.userId).equal(floor.id);
        expect(s.x).equal(1);
        expect(s.y).equal(2);
        expect(s.width).equal(GraphicsSystem.SpriteWidth());
        expect(s.height).equal(GraphicsSystem.SpriteHeight());


        let spriteUrl = app.db.First(GraphicsSpriteUrl);
        expect(spriteUrl.idGraphicsSprite).equal(s.id);
        expect(spriteUrl.userId).equal(floor.id);
        expect(spriteUrl.url).equal('StoneBlock.png');
    });

    it('Add Toby', function () {
        let app = new App().CreateNoDom();
        new GraphicsSystem().Configure(app);
        app.db.Insert(new Root());

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        let s = app.db.First(GraphicsSprite, x => x.userId == toby.id);
        expect(s.x).equal(1);
        expect(s.y).equal(2);
        expect(s.width).equal(GraphicsSystem.SpriteWidth());
        expect(s.height).equal(GraphicsSystem.SpriteHeight());

        let spriteUrl = app.db.First(GraphicsSpriteUrl);
        expect(spriteUrl.idGraphicsSprite).equal(s.id);
        expect(spriteUrl.userId).equal(toby.id);
        expect(spriteUrl.url).equal('CharacterCatGirlDown.png');


        toby.x = 5;
        toby.y = 6;
        app.db.Update(toby);


        expect(s.x).equal(5);
        expect(s.y).equal(6);
    });

    it('Add Knife', function () {
        let app = new App().CreateNoDom();
        new GraphicsSystem().Configure(app);
        app.db.Insert(new Root());

        let knife = new Knife();
        knife.x = 1;
        knife.y = 2;
        app.db.Insert(knife);

        let s = app.db.First(GraphicsSprite, x => x.userId == knife.id);
        expect(s.x).equal(1);
        expect(s.y).equal(2);
        expect(s.width).equal(GraphicsSystem.SpriteWidth());
        expect(s.height).equal(GraphicsSystem.SpriteHeight());


        let spriteUrl = app.db.First(GraphicsSpriteUrl);
        expect(spriteUrl.idGraphicsSprite).equal(s.id);
        expect(spriteUrl.userId).equal(knife.id);
        expect(spriteUrl.url).equal('CuttingBlock.png');
    });
});