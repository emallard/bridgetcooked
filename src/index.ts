import { disableBodyScroll } from 'body-scroll-lock';
import { App } from "./App";
import { MoveSystem } from "./System/MoveSystem";
import { Tob } from "./Blocks/Tob";
import { Floor } from "./Blocks/Floor";
import { Supply } from "./Blocks/Supply";
import { GraphicsSystem } from "./System/GraphicsSystem";
import { SvgPlayerMoveControlSystem } from "./System/SvgPlayerMoveControlSystem";
import { ThreeSystem } from "./System/ThreeSystem";
import { ThreeGraphicsSpriteSystem } from "./System/ThreeGraphicsSpriteSystem";
import * as THREE from "three";
import { SvgPlayerActionControlSystem } from "./System/SvgPlayerActionControlSystem";
import { SupplySystem } from "./System/SupplySystem";
import { GraphicsFoodAttachmentSystem } from "./System/GraphicsFoodAttachmentSystem";
import { Table } from "./Blocks/Table";
import { PlayerActionSystem } from "./System/PlayerActionSystem";
import { TableSystem } from "./System/TableSystem";
import { SvgRootSystem } from "./System/SvgRootSystem";
import { Root } from "./Blocks/Root";
import { FoodType } from './Blocks/FoodType';
import { Knife } from './Blocks/Knife';
import { KnifeSystem } from './System/KnifeSystem';
import { HighlightSystem } from './System/HighlightSystem';
import { GraphicsHighlightSystem } from './System/GraphicsHighlightSystem';
import { Pan } from './Blocks/Pan';
import { PanSystem } from './System/PanSystem';
import { End } from './Blocks/End';
import { EndSystem } from './System/EndSystem';
import { DomMessageSystem } from './System/DomMessageSystem';

function doResize(svg: SVGElement) {
    svg.style.backgroundColor = 'white';
    let margin = 5;
    // css margins to create something like a frame around the element
    // and prevent browsers from making scrollbars visible
    svg.style.marginLeft = margin + "px";
    svg.style.marginTop = margin + "px";

    // set svg dimensions
    svg.setAttribute('width', '' + (window.innerWidth - (margin * 2)));
    svg.setAttribute('height', '' + (window.innerHeight - (margin * 2)));
}


export async function newApp() {

    console.log('happy birthday bridget');

    let app = new App();
    app.CreateNoDom();
    //app.db.logLevel = 2;


    new GraphicsSystem().Configure(app);
    new MoveSystem().Configure(app);
    new HighlightSystem().Configure(app);
    new PlayerActionSystem().Configure(app);
    new SupplySystem().Configure(app);
    new TableSystem().Configure(app);
    new KnifeSystem().Configure(app);
    new PanSystem().Configure(app);
    new EndSystem().Configure(app);
    new GraphicsHighlightSystem().Configure(app);
    new GraphicsFoodAttachmentSystem().Configure(app);
    new SvgRootSystem().Configure(app);
    new SvgPlayerMoveControlSystem().Configure(app);
    new SvgPlayerActionControlSystem().Configure(app);
    new ThreeSystem().Configure(app);
    new ThreeGraphicsSpriteSystem().Configure(app);
    new DomMessageSystem().Configure(app);

    app.db.Insert(new Root());

    let toby = new Tob();
    toby.x = 0;
    toby.y = 0;
    app.db.Insert(toby);

    function CreateSupply(x: number, y: number, type: FoodType) {
        let supply = new Supply();
        supply.x = x * GraphicsSystem.SpriteWidth();
        supply.y = y * GraphicsSystem.SpriteHeight();
        supply.foodType = type;
        app.db.Insert(supply);
    }

    function Create<T>(ctor: new () => T, x: number, y: number): T {

        let t = new ctor();
        let tany = <any>t;
        tany.x = x * GraphicsSystem.SpriteWidth();
        tany.y = y * GraphicsSystem.SpriteHeight();
        app.db.Insert(tany);
        return t;
    }

    function Test1() {

        //CreateSupply(4, 0, FoodType.PlateEnd);

        CreateSupply(0, -2, FoodType.Kiwi);
        CreateSupply(-2, -2, FoodType.Pork);
        CreateSupply(-4, -2, FoodType.Plate);
        CreateSupply(-6, -2, FoodType.Rice);


        Create(Knife, -6, 2);
        Create(Table, -4, 2);
        Create(Table, -2, 2);
        Create(Pan, 0, 2);

        Create(End, 2, 0);

        for (let ix = -10; ix < 10; ++ix) {
            for (let iy = -10; iy < 10; ++iy) {
                let x = ix * GraphicsSystem.SpriteWidth();;
                let y = iy * GraphicsSystem.SpriteHeight();

                // insert or not :
                let doInsert = true;
                for (let supply of app.db.GetAll(Supply)) {
                    if (x == supply.x && y == supply.y)
                        doInsert = false;
                }

                for (let table of app.db.GetAll(Table)) {
                    if (x == table.x && y == table.y)
                        doInsert = false;
                }


                for (let knife of app.db.GetAll(Knife)) {
                    if (x == knife.x && y == knife.y)
                        doInsert = false;
                }

                for (let pan of app.db.GetAll(Pan)) {
                    if (x == pan.x && y == pan.y)
                        doInsert = false;
                }

                for (let end of app.db.GetAll(End)) {
                    if (x == end.x && y == end.y)
                        doInsert = false;
                }

                if (!doInsert)
                    continue;


                let floor = new Floor();

                let shadow = false;
                for (let supply of app.db.GetAll(Supply)) {
                    if (x == supply.x && y == supply.y - GraphicsSystem.SpriteHeight())
                        shadow = true;
                }

                for (let table of app.db.GetAll(Table)) {
                    if (x == table.x && y == table.y - GraphicsSystem.SpriteHeight())
                        shadow = true;
                }

                for (let knife of app.db.GetAll(Knife)) {
                    if (x == knife.x && y == knife.y - GraphicsSystem.SpriteHeight())
                        shadow = true;
                }

                for (let pan of app.db.GetAll(Pan)) {
                    if (x == pan.x && y == pan.y - GraphicsSystem.SpriteHeight())
                        shadow = true;
                }

                for (let end of app.db.GetAll(End)) {
                    if (x == end.x && y == end.y - GraphicsSystem.SpriteHeight())
                        shadow = true;
                }

                if (shadow == true)
                    floor.url = 'StoneBlockShadow.png';
                else
                    floor.url = 'StoneBlock.png';
                floor.x = x;
                floor.y = y;
                app.db.Insert(floor);
            }
        }


    }

    Test1();

    var clock = new THREE.Clock();
    var accumDelta = 0;
    function update() {
        requestAnimationFrame(update);

        let delta = clock.getDelta();
        accumDelta += delta;
        if (accumDelta > 0.02) {
            app.Update(accumDelta);
            accumDelta = 0;
        }
    }

    requestAnimationFrame(update);
}


export function drawImg() {

}

