
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
import { SensorSystem } from "./SensorSystem";
import { Supply } from "../Blocks/Supply";
import { SensorRect } from "./SensorRect";
import { TobSensor } from "../Blocks/TobSensor";


describe('SensorSystem', function () {

    it('Sensor Supply', function () {
        let app = new App().CreateNoDom();
        new SensorSystem().Configure(app);

        let toby = new Tob();
        toby.x = 1;
        toby.y = 2;
        app.db.Insert(toby);

        let supply = new Supply();
        supply.x = 100;
        supply.y = 200;
        app.db.Insert(supply);

        expect(app.db.Count(SensorRect)).equals(1);

        let sensorRect = app.db.First(SensorRect);
        expect(sensorRect.userId).equal(supply.id);
        expect(sensorRect.x).equal(100);
        expect(sensorRect.y).equal(200);
        expect(sensorRect.width).equal(SensorSystem.SensorWidth);
        expect(sensorRect.height).equal(SensorSystem.SensorHeight);


        expect(app.db.Count(TobSensor)).equals(1);

        let tobSensor = app.db.First(TobSensor);
        expect(tobSensor.idSensored).equal(null);

        toby.x = 100;
        toby.y = 200;
        app.db.Update(toby);

        // TODO !
        //expect(tobSensor.idSensored).equal(supply.id);
    });
});