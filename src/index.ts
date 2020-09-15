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
    new PlayerActionSystem().Configure(app);
    new SupplySystem().Configure(app);
    new TableSystem().Configure(app);
    new GraphicsFoodAttachmentSystem().Configure(app);
    new SvgRootSystem().Configure(app);
    new SvgPlayerMoveControlSystem().Configure(app);
    new SvgPlayerActionControlSystem().Configure(app);
    new ThreeSystem().Configure(app);
    new ThreeGraphicsSpriteSystem().Configure(app);

    app.db.Insert(new Root());

    let toby = new Tob();
    toby.x = 0;
    toby.y = 0;
    app.db.Insert(toby);


    function Test1() {

        let supply = new Supply();
        supply.x = 0;
        supply.y = 2 * GraphicsSystem.SpriteHeight();
        supply.foodType = FoodType.Kiwi;
        app.db.Insert(supply);

        supply = new Supply();
        supply.x = -2 * GraphicsSystem.SpriteWidth();
        supply.y = 2 * GraphicsSystem.SpriteHeight();
        supply.foodType = FoodType.Pork;
        app.db.Insert(supply);


        let knife = new Knife();
        knife.x = -2 * GraphicsSystem.SpriteWidth();
        knife.y = 4 * GraphicsSystem.SpriteHeight();
        app.db.Insert(knife);

        let table: Table;
        for (let tx = 0; tx < 3; ++tx) {
            table = new Table();
            table.x = tx * GraphicsSystem.SpriteWidth();
            table.y = 4 * GraphicsSystem.SpriteHeight();
            app.db.Insert(table);
        }

        table = new Table();
        table.x = 2 * GraphicsSystem.SpriteWidth();
        table.y = 2 * GraphicsSystem.SpriteHeight();
        app.db.Insert(table);

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
    function update() {
        //requestAnimationFrame(update);

        let delta = clock.getDelta();
        app.Update(delta);
    }

    setInterval(update, 0);
}


export function drawImg() {

}

