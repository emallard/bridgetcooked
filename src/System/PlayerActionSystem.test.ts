
import { App } from "../App";
import { expect } from "chai";
import { Tob } from "../Blocks/Tob";
import { SupplySystem } from "./SupplySystem";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { Supply } from "../Blocks/Supply";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { PlayerActionSystem } from "./PlayerActionSystem";
import { Root } from "../Blocks/Root";


describe('FoodSystem', function () {

    it('PlayerActionControl', function () {
        let app = new App().CreateNoDom();
        new PlayerActionSystem().Configure(app);
        app.db.Insert(new Root());

        expect(app.db.Count(PlayerAction)).equal(1);
    });

});